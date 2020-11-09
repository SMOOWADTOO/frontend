<template>
    <section class="container">
        <br>
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <h1 class="title has-text-grey-dark has-text-centered">{{title}}</h1>
                <!-- <p class="has-text-centered">Fill in the details below to create your shop and start listing products!</p> -->
            </div>
        </div>
        <br>
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <form v-on:submit.prevent="submitShopUpdate">
                    <b-field label="Shop Profile Picture">
                        <div class="columns">
                            <div class="column is-3">
                                <h5>Current photo</h5>
                                <img :src="profilePhotoURL">
                            </div>
                            <b-upload v-model="profilePhoto"
                                drag-drop v-if="profilePhoto == null">
                                <section class="section">
                                    <div class="content has-text-centered">
                                        <p>
                                            <b-icon
                                                icon="upload"
                                                size="is-large">
                                            </b-icon>
                                        </p>
                                        <p>Drop your image files here or click to upload your shop picture for your shop</p>
                                    </div>
                                </section>
                            </b-upload>
                            <section class="section" v-if="profilePhoto != null">
                                <div class="content">
                                    <img v-if="profilePhoto != null" :src="profilePhotoPreview" style="max-width: 20vw;">
                                    <br><br>
                                    <span
                                        class="tag is-primary" v-if="profilePhoto != null">
                                        {{profilePhoto.name}}
                                        <button class="delete is-small"
                                            type="button"
                                            @click="deleteDropFile">
                                        </button>
                                    </span>
                                </div>
                            </section>
                        </div>
                    </b-field>

                    <b-field label="Shop Name*">
                        <b-input custom-class="has-background-input" v-model="sName" type="text" placeholder="Shop Name" class="borderless" expanded required></b-input>
                    </b-field>

                    <b-field label="Shop Email*">
                        <b-input custom-class="has-background-input" v-model="sEmail" type="email" placeholder="Email" class="borderless" expanded required></b-input>
                    </b-field>

                    <b-field label="Shop Contact Number*">
                        <div class="columns">
                            <div class="column is-2">
                                <b-input maxlength="3" custom-class="has-background-input borderless" v-model="countryCode" type="text" placeholder="65"  expanded required></b-input>
                            </div>
                            <div class="column is-10">
                                <b-input maxlength="12" custom-class="has-background-input borderless" v-model="phoneNo" type="text" placeholder="91234567" expanded required></b-input>
                            </div>
                        </div>
                    </b-field>

                    <b-field label="Shop Description*">
                        <b-input custom-class="has-background-input" v-model="sDesc" type="textarea" placeholder="Contact Number" class="borderless" expanded required></b-input>
                    </b-field>

                    <b-field label="Shop Website">
                        <b-input custom-class="has-background-input" v-model="sWebsite" type="text" placeholder="Website URL" class="borderless" expanded required></b-input>
                    </b-field>

                    <br>
                    <p class="subtitle has-text-signature-purple">
                        Shop Address
                    </p>
                    <b-field label="Shop Postal Code">
                        <b-input custom-class="has-background-input" v-model="postalCode" type="text" placeholder="Shop Address" class="borderless" expanded></b-input>
                    </b-field>
                    <b-field label="Shop Address*">
                        <b-input custom-class="has-background-input" v-model="sAddr" type="text" placeholder="Shop Address" class="borderless" expanded required></b-input>
                    </b-field>
                    <br>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link" type="submit">{{submitTxt}}</button>
                        </div>
                        <div class="control">
                            <button class="button is-link is-light" @click="cancelAction">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <br>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                dropFiles: [],
                shopId: "",
                // shopId: this.$route.params.shopId,
                sName: "",
                username: this.$auth.user.user.username,
                sAddr: "",
                sEmail: "",
                countryCode: "",
                phoneNo: "",
                sDesc: "",
                sWebsite: "",
                profilePhotoURL: "",
                title: "Create Your Shop",
                submitTxt: "Create",
                postalCode: "",
                
                // new profile photo settings
                profilePhoto: null,
                profilePhotoString: "",
                profilePhotoPreview: "",
            }
        },
        watch: {
            profilePhoto: function() {
                if (this.profilePhoto != null) {
                    this.onFileChange().then((fileData) => {
                        this.profilePhotoString = fileData
                    })
                }
            },
            postalCode: function() {
                if (this.postalCode != undefined && this.postalCode.length == 6) {
                    this.getAddress()
                }
            },
        },
        mounted() {
            this.hasStore()
        },
        methods: {
            hasStore() {
                if (this.$route.params.shopId) {
                    this.shopId = this.$route.params.shopId;
                    this.getInfo();
                } else {
                    this.shopId = ""
                }
            },
            getInfo() {
                // let r = this.$axios.get(this.SHOPAPI + "/user/" + this.$auth.user.user.username)
                let r = this.$axios.get(this.SHOPAPI + "/" + this.shopId)
                // let r = this.$axios.get("http://localhost:7002/shop/user/" + this.username)//this.$auth.user.user.username)
                .then((resp) => {
                    // check if have shop
                    var shop = resp.data.shop;
                    if (shop) {
                        this.title = "Edit Your Shop";
                        this.profilePhotoURL = shop.shopImageURL;
                        this.submitTxt = "Edit"
                        this.shopId = shop.shopId
                        this.sName = shop.shopName
                        this.sEmail = shop.email
                        // contact No
                        if (shop.contactNo) {
                            var cNo = shop.contactNo.split(" ");
                            this.countryCode = cNo[0];
                            this.phoneNo = cNo[1];
                        }
                        this.sDesc = shop.shopDesc
                        this.sWebsite = shop.website
                        this.sAddr = shop.address
                    } else {
                        this.title = "Create Your Shop";
                    }
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response, "is-danger", 2000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            submitShopUpdate() {
                // let r = this.$axios.post(this.SHOPAPI + "/create", {
                if (this.submitTxt == "Edit") {
                    // let r = this.$axios.post("http://localhost:7002/shop/edit", {
                    let r = this.$axios.post(this.SHOPAPI + "/edit", {
                        "address": this.sAddr, 
                        "contactNo": this.countryCode + " " + this.phoneNo, 
                        "email": this.sEmail, 
                        "shopDesc": this.sDesc, 
                        "shopImageFile": this.profilePhotoString, 
                        "shopName": this.sName, 
                        "username": this.$auth.user.user.username, 
                        "website": this.sWebsite,
                        "shopId": this.shopId
                    }).then((resp) => {
                        this.toastAlert("Shop has been updated!", "is-success", 5000)
                        this.$router.push("/storefront/" + this.shopId);
                    }).catch((error) => {
                        if (error.response != undefined) {
                            var response = error.response.data
                            this.toastAlert(response, "is-danger", 2000)
                        } else {
                            this.toastAlert(error, "is-danger", 5000)
                        }
                    })
                } else {
                    let r = this.$axios.post(this.SHOPAPI + "/create", {
                        "address": this.sAddr, 
                        "contactNo": this.countryCode + " " + this.phoneNo, 
                        "email": this.sEmail, 
                        "shopDesc": this.sDesc, 
                        "shopImageFile": this.profilePhotoString, 
                        "shopName": this.sName, 
                        "username": this.$auth.user.user.username, 
                        "website": this.sWebsite
                    }).then((resp) => {
                        this.toastAlert("Shop has been created!", "is-success", 5000)
                        let r = this.$axios.get(this.SHOPAPI + "/user/" + this.$auth.user.user.username)
                        .then((resp) => {
                            // check if have shop
                            var shops = resp.data.shops;
                            // get latest store created by user
                            if (shops.length > 0) {
                                var latestShop = shops.pop() 
                                var newShopId = latestShop.shopId;
                                this.$router.push("/storefront/" + newShopId);
                            } else {
                                this.toastAlert('Something went wrong when creating shop, please try again', "is-danger", 2000)
                            }
                        }).catch((error) => {
                            if (error.response != undefined) {
                                var response = error.response.data
                                this.toastAlert(response, "is-danger", 2000)
                            } else {
                                this.toastAlert(error, "is-danger", 5000)
                            }
                        })
                    }).catch((error) => {
                        if (error.response != undefined) {
                            var response = error.response.data
                            this.toastAlert(response, "is-danger", 2000)
                        } else {
                            this.toastAlert(error, "is-danger", 5000)
                        }
                    })

                }
            },
            getAddress() {
                let response = this.$axios.get(this.GENERALAPI + '/map/address/' + this.postalCode).then((resp) => {
                    var a = resp.data.address
                    if (a) {
                        this.sAddr = a.ADDRESS
                    } else {
                        this.sAddr = "";
                    }
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert("Address: " + response.message, "is-danger", 2000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                    this.addressLine1 = ""
                    this.addressLine2 = ""
                })
            },
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            },
            onFileChange() {
                const file = this.profilePhoto
                return new Promise((resolve, reject) => {
                    if (file.size < 10000000) {
                        // Check if file type is jpeg or png
                        if (file.type != "image/jpeg" && file.type != "image/png") {
                            this.snackbarAlert("File is not in JPEG or PNG format!", "is-danger", 5000)
                            this.deleteDropFile()
                        } else {
                            this.profilePhotoPreview = URL.createObjectURL(file);
                            
                            const reader = new FileReader()
                            reader.readAsDataURL(this.profilePhoto)
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = error => reject(error);
                        }
                    } else {
                        // console.log("FILE SIZE: "+ file.size)
                        this.snackbarAlert("File is too large!", "is-danger", 5000)
                        this.deleteDropFile()
                    }

                })
            },
            deleteDropFile() {
                this.profilePhoto = null
                this.profilePhotoString = ""
                this.profilePhotoPreview = null
            },
            cancelAction() {
                if (this.submitTxt == "Edit") {
                    this.$router.push("/storefront/" + this.shopId);
                } else {
                    this.$router.push("/user/profile/" + this.$auth.user.user.id)
                }
            }
        }
    }
</script>