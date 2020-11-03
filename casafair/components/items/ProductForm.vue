<template>
    <section>
        <br>
        <div class="columns is-centered is-vcentered">
            <b-field label="Product picture">
                <div class="columns">
                    <div class="column is-6">
                        <h5>Current photo</h5>
                        <img :src="productInfo.productPhotoURL">
                    </div>
                    <div class="column is-6">
                        <h5>Upload a new photo</h5>
                        <b-upload v-model="productPhoto"
                    drag-drop v-if="productPhoto == null">
                            <section class="section">
                                <div class="content has-text-centered">
                                    <p>
                                        <b-icon
                                            icon="upload"
                                            size="is-large">
                                        </b-icon>
                                    </p>
                                    <p>Drop your product photo here or click to upload</p>
                                </div>
                            </section>
                        </b-upload>
                        <section class="section" v-if="productPhoto != null">
                            <div class="content">
                                <img v-if="productPhoto != null" :src="productPhotoPreview" style="max-width: 20vw;">
                                <br><br>
                                <span
                                    class="tag is-primary" v-if="productPhoto != null">
                                    {{productPhoto.name}}
                                    <button class="delete is-small"
                                        type="button"
                                        @click="deleteDropFile">
                                    </button>
                                </span>
                            </div>
                        </section>
                    </div>
                </div>
                
            </b-field>

            <div class="tags">
                <span v-for="(file, index) in dropFiles"
                    :key="index"
                    class="tag is-primary" >
                    {{file.name}}
                    <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)">
                    </button>
                </span>
            </div>
        </div>

        <div class="columns is-centered">
            <div class="column is-9">

                <div class="field">
                    <label class="label">Product Title</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Product Title" v-model="productInfo.productName">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Price per unit</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Price" v-model="productInfo.unitPrice" >
                    </div>
                </div>

                <div class="field">
                    <label class="label">Product Description</label>
                    <div class="control">
                        <textarea v-model="productInfo.productDesc" class="textarea" placeholder="Product Description"></textarea>
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" v-on:click="handleSubmit()">List It!</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light" v-on:click="$router.back()">Cancel</button>
                    </div>
                </div>
            </div>

        </div>


        <br>
    </section>
</template>

<script>
    export default {
        props: {
            productID: Number,
        },
        data() {
            return {
                dropFiles: [],
                productInfo: {},
                shopID: 0,
                productPhotoString: "",

                // new product photo settings
                productPhoto: null,
                productPhotoString: "",
                productPhotoPreview: "",
            }
        },
        watch: {
            productPhoto: function() {
                if (this.productPhoto != null) {
                    this.onFileChange().then((fileData) => {
                        this.productPhotoString = fileData
                    })
                }
            }
        },
        methods: {
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            },
            fetchInfo() {
                let r = this.$axios.get(this.PRODUCTAPI + "/" + this.productID).then((response) => {
                    let productsData = response.data
                    this.productInfo = productsData.product
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            updateInfo() {
                let r = this.$axios.post(this.PRODUCTAPI + "/edit", {
                    "productDesc": this.productInfo.productDesc,
                    "productId": this.$route.params.id,
                    "productName": this.productInfo.productName,
                    "unitPrice": this.productInfo.unitPrice,
                    "productPhotoFile": this.productPhotoString,
                }).then((response) => {
                    let productsData = response.data
                    this.productInfo = productsData.product
                    this.toastAlert(productsData.message, "is-success", 5000)
                    this.$router.push("/storefront/product/" + this.$route.params.id)
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            createProduct() {
                let r = this.$axios.post(this.PRODUCTAPI + "/add", {
                    "shopId": this.shopID,
                    "productId": this.$route.params.id,
                    "productName": this.productInfo.productName,
                    "productDesc": this.productInfo.productDesc,
                    "unitPrice": this.productInfo.unitPrice,
                    "productPhotoFile": this.productPhotoString,
                }).then((response) => {
                    let productsData = response.data
                    this.productInfo = productsData.product
                    this.toastAlert("Done! Your product is added to your storefront!", "is-success", 5000)
                    this.$router.push("/storefront/product/" + this.productInfo.productId)
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            handleSubmit() {
                var currentPath = this.$nuxt.$route.path.split("/")[3]
                if (currentPath === "new") {
                    this.shopID = this.$nuxt.$route.query.shopID
                    this.createProduct()
                } else {
                    this.updateInfo()
                }
            },
            deleteDropFile() {
                this.productPhoto = null
                this.productPhotoString = ""
                this.productPhotoPreview = null
            },
            onFileChange() {
                const file = this.productPhoto
                return new Promise((resolve, reject) => {
                    if (file.size < 10000000) {
                        // Check if file type is jpeg or png
                        if (file.type != "image/jpeg" && file.type != "image/png") {
                            this.snackbarAlert("File is not in JPEG or PNG format!", "is-danger", 5000)
                            this.deleteDropFile()
                        } else {
                            this.productPhotoPreview = URL.createObjectURL(file);
                            
                            const reader = new FileReader()
                            reader.readAsDataURL(this.productPhoto)
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
        }
    }
</script>