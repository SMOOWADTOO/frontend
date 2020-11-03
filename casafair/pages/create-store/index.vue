<template>
    <section>
        <br>
        <h1 class="hero-title is-size-1 is-size-3-touch has-text-signature has-text-centered-desktop">
            Create Your Shop
        </h1>
        <p class="has-text-centered-desktop">Fill in the details below to create your shop and start listing products!</p>
        <br><br>
        <form v-on:submit.prevent="submitShopUpdate">
            <div class="columns is-centered">
                <b-field label="Shop Profile Picture">
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
                </b-field>

                <!-- <div class="tags">
                    <span v-for="(file, index) in dropFiles"
                        :key="index"
                        class="tag is-primary" >
                        {{file.name}}
                        <button class="delete is-small"
                            type="button"
                            @click="deleteDropFile(index)">
                        </button>
                    </span>
                </div> -->
            </div>

            <div class="columns is-centered">
                <div class="column is-7">
                    <b-field label="Shop Name">
                        <b-input custom-class="has-background-input" v-model="sName" type="text" placeholder="Shop Name" class="borderless" expanded required></b-input>
                    </b-field>

                    <b-field label="Shop Address">
                        <b-input custom-class="has-background-input" v-model="sAddr" type="text" placeholder="Shop Address" class="borderless" expanded required></b-input>
                    </b-field>

                    <b-field label="Shop Email">
                        <b-input custom-class="has-background-input" v-model="sEmail" type="email" placeholder="Email" class="borderless" expanded required></b-input>
                    </b-field>

                    <b-field label="Shop Contact Number">
                        <b-input custom-class="has-background-input" v-model="sContact" type="text" placeholder="Contact Number" class="borderless" expanded required></b-input>
                    </b-field>

                    <b-field label="Shop Description">
                        <b-input custom-class="has-background-input" v-model="sDesc" type="textarea" placeholder="Contact Number" class="borderless" expanded required></b-input>
                    </b-field>

                    <b-field label="Shop Website">
                        <b-input custom-class="has-background-input" v-model="sWebsite" type="text" placeholder="Website URL" class="borderless" expanded required></b-input>
                    </b-field>

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link" type="submit">Create Shop</button>
                        </div>
                        <div class="control">
                            <button class="button is-link is-light">Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </form>
        <br>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                dropFiles: [],
                sName: "",
                username: this.$auth.user.user.username,
                sAddr: "",
                sEmail: "",
                sContact: "",
                sDesc: "",
                sWebsite: "",
                profilePhotoURL: "",
                
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
            }
        },
        methods: {
            submitShopUpdate() {
                console.log("HelLo");
                // let r = this.$axios.post(this.USERAPI + "/profile", {
                let r = this.$axios.post(this.SHOPAPI + "/create", {
                    "address": this.sAddr, 
                    "contactNo": this.sContact, 
                    "email": this.sEmail, 
                    "shopDesc": this.sDesc, 
                    "shopImageFile": this.profilePhotoString, 
                    "shopName": this.sName, 
                    "username": this.$auth.user.user.username, 
                    "website": this.sWebsite
                }).then((resp) => {
                    this.toastAlert("Shop has been updated!", "is-success", 5000)
                    this.deleteDropFile()
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response, "is-danger", 2000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
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
                        console.log("FILE SIZE: "+ file.size)
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
        }
    }
</script>