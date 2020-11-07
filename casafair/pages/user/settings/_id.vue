<template>
    <section class="container page-content">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <br>
                <h1 class="title has-text-grey-dark has-text-centered-touch">Account</h1>
            </div>
        </div>
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <b-tabs v-model="activeTab">
                    <b-tab-item label="Edit my information">
                        <form v-on:submit.prevent="submitInformationUpdate">
                            <h1 class="hero-title is-size-1 is-size-3-touch has-text-signature has-text-centered-desktop">
                                My Information
                            </h1>
                            <br>
                            <p class="subtitle has-text-signature-purple">
                                Personal Information
                            </p>
                            <b-tooltip label="Just trust us. We won't leak it out like Lazada." dashed multilined type="is-light">
                                <small>How is my data managed?</small>
                            </b-tooltip>
                            <br>
                            <small class="is-italic has-text-signature-red">* marks compulsory fields</small>
                            <br>
                            <br>
                            <b-field label="NRIC*">
                                <b-input maxlength="9" custom-class="has-background-input borderless" v-model="nric" type="text" placeholder="S9812381D"  expanded required></b-input>
                            </b-field>

                            <b-field label="Your first name*">
                                <b-input custom-class="has-background-input borderless" v-model="fName" type="text" placeholder="Min Tao, Ayesha (binte), Jayaraj (s/o), Sophia..."  expanded required></b-input>
                            </b-field>

                            <b-field label="Your last name*">
                                <b-input custom-class="has-background-input borderless" v-model="lName" type="text" placeholder="Lee, Osman, Kumar, Smith..."  expanded required></b-input>
                            </b-field>

                            <b-field label="Your mobile number*">
                                <div class="columns">
                                    <div class="column is-2">
                                        <b-input maxlength="3" custom-class="has-background-input borderless" v-model="countryCode" type="text" placeholder="65"  expanded required></b-input>
                                    </div>
                                    <div class="column is-10">
                                        <b-input maxlength="12" custom-class="has-background-input borderless" v-model="phoneNo" type="text" placeholder="91234567" expanded required></b-input>
                                    </div>
                                </div>
                            </b-field>

                            <b-field
                                label="Gender*">
                                <b-select v-model="gender" placeholder="Select your gender" expanded required>
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </b-select>
                            </b-field>

                            <b-field label="Birthday*">
                                <b-datepicker
                                    custom-class="has-background-input" 
                                    placeholder="Your birthday"
                                    :max-date="maxDate"
                                    v-model="birthDate"
                                    icon="calendar-today"
                                    required>
                                </b-datepicker>
                            </b-field>
                            <small class="is-italic">You must be 18 years old to use this service.</small><br><br><br>
                            <p class="subtitle has-text-signature-purple">
                                My Address
                            </p>
                            <b-field label="Postal Code*">
                                <b-input custom-class="has-background-input borderless" v-model="postalCode" type="text" placeholder="307987" expanded required></b-input>
                            </b-field>
                            <small class="is-italic">Key in your postal code first, and your address will appear below.</small><br><br>
                            <b-field label="Address (Line 1)*">
                                <b-input custom-class="has-background-input borderless" v-model="addressLine1" type="text" placeholder="55 Newton Road" expanded required></b-input>
                            </b-field>
                            <b-field label="Address (Line 2)">
                                <b-input custom-class="has-background-input borderless" v-model="addressLine2" type="text" placeholder="Revenue House" expanded></b-input>
                            </b-field>
                            <br>
                            <button class="button is-primary signature-dark-purple-shadows my-3" type="submit">Update</button>
                        </form>
                    </b-tab-item>
                    <b-tab-item label="Edit my profile">
                        <form v-on:submit.prevent="submitProfileUpdate">
                            <h1 class="hero-title is-size-1 is-size-3-touch has-text-signature has-text-centered-desktop">
                                My Profile
                            </h1>
                            <br>
                            <p class="subtitle has-text-signature-purple">
                                Profile Information
                            </p>
                            <br>
                            <p class="subtitle has-text-signature-purple">
                                Hello, tell us more about you
                            </p>
                            <b-field label="Profile picture">
                                <div class="columns">
                                    <div class="column is-3">
                                        <h5>Current photo</h5>
                                        <img :src="profilePhotoURL">
                                    </div>
                                    <div class="column is-9">
                                        <h5>Upload a new photo</h5>
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
                                                    <p>Drop your profile photo here or click to upload</p>
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
                                </div>
                                
                            </b-field>
                            <br>
                            <b-field label="Something about yourself">
                                <b-input v-model="description" maxlength="200" type="textarea" placeholder="This will be what's displayed on your profile page. Max 200 characters" custom-class="has-background-input"></b-input>
                            </b-field>
                            <button class="button is-primary signature-dark-purple-shadows my-3" type="submit">Update</button>
                        </form>
                    </b-tab-item>
                    <!-- <b-tab-item label="Edit my account settings">
                        <form v-on:submit.prevent="submitAccountUpdate">
                            <h1 class="hero-title is-size-1 is-size-3-touch has-text-signature has-text-centered-desktop">
                                My Account Settings
                            </h1>
                            <br>
                            <p class="subtitle has-text-signature-purple">
                                Login information
                            </p>
                            <br>
                            <b-field label="Current password" :type="uiLabels.currentPassword" :message="uiLabels.currentPasswordFieldMessage">
                                <b-input custom-class="has-background-input" v-model="currentPassword" type="password" placeholder="Your current password" class="borderless" v-on:blur="checkCurrentPassword" required password-reveal></b-input>
                            </b-field>
                            <br>
                            <b-field label="New password" :type="uiLabels.password" :message="uiLabels.passwordFieldMessage">
                                <b-input custom-class="has-background-input" v-model="password" type="password" placeholder="Your new password" class="borderless" v-on:blur="checkPassword" required password-reveal></b-input>
                            </b-field>
                            <small class="is-italic">Your password has to be at least 8 characters, and contains an uppercase letter and a numeric digit</small><br><br>
                            {{uiLabels.passwordFieldMessage}}
                            <b-field label="Confirm new password" :type="uiLabels.cPassword" :message="uiLabels.cPasswordFieldMessage">
                                <b-input custom-class="has-background-input" v-model="cPassword" type="password" placeholder="Confirm your new password" class="borderless" v-on:blur="checkIsSamePassword" required password-reveal></b-input>
                            </b-field>
                            <button class="button is-primary signature-dark-purple-shadows my-3" type="submit" :disabled="currentPwErrors || pwErrors || cPwErrors">Update</button>
                        </form>
                    </b-tab-item> -->
                </b-tabs>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    head () {
        return {
            title: this.title,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: 'Edit your account settings' }
            ]
        }
    },
    data() {
        const today = new Date()
        const minDate = new Date(today.setUTCFullYear(today.getUTCFullYear() - 18))
        return {
            title: "Casafair | Profile Settings",

            activeTab: 0,

            // Account

            currentPassword: "",
            // new passwords
            password: "",
            cPassword: "",
            currentPwErrors: true,
            pwErrors: true,
            cPwErrors: true,

            // Information
            nric: "",
            fName: "",
            lName: "",
            countryCode: "",
            phoneNo: "",
            mobileNo: this.countryCode + " " + this.phoneNo,
            gender: "",
            birthDate: new Date(minDate),
            maxDate: new Date(minDate),
            postalCode: "",
            addressLine1: "",
            addressLine2: "",
            automatedAddress: false,

            // Profile
            description: "",
            profilePhotoURL: "",
            
            // new profile photo settings
            profilePhoto: null,
            profilePhotoString: "",
            profilePhotoPreview: "",

            uiLabels: {
                currentPassword: "",
                currentPasswordFieldMessage: "",
                password: "",
                passwordFieldMessage: "",
                cPassword: "",
                cPasswordFieldMessage: "",
            }
        }
    },
    watch: {
        postalCode: function() {
            if (this.postalCode != undefined && this.postalCode.length == 6) {
                this.getAddress()
            }
        },

        profilePhoto: function() {
            if (this.profilePhoto != null) {
                this.onFileChange().then((fileData) => {
                    this.profilePhotoString = fileData
                })
            }
        }
    },
    mounted() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            let response = this.$axios.get(this.USERAPI + '/profile/me').then((r) => {
                var infoResponse = r.data.user
                
                this.nric = infoResponse.nric === "" ? "" : infoResponse.nric
                this.fName = infoResponse.firstName === "" ? "" : infoResponse.firstName
                this.lName = infoResponse.lastName === "" ? "" : infoResponse.lastName
                this.mobileNo = infoResponse.phoneNo === "" ? "" : infoResponse.phoneNo

                if (this.mobileNo != null) {
                    var mobileNo = this.mobileNo.split(" ")
                    this.countryCode = mobileNo[0]
                    this.phoneNo = mobileNo[1]
                }
                
                this.gender = infoResponse.gender === "" ? "" : infoResponse.gender
                this.birthDate = infoResponse.birthday === null ? new Date() : new Date(infoResponse.birthday)
                this.description = infoResponse.description === "" ? "" : infoResponse.description
                this.postalCode = infoResponse.postalCode === "" ? "" : infoResponse.postalCode
                this.addressLine1 = infoResponse.addressLine1 === "" ? "" : infoResponse.addressLine1
                this.addressLine2 = infoResponse.addressLine2 === "" ? "" : infoResponse.addressLine2
                this.profilePhotoURL = infoResponse.profilePhotoURL === "" ? "" : infoResponse.profilePhotoURL
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 2000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
        getAddress() {
            let response = this.$axios.get(this.GENERALAPI + '/map/address/' + this.postalCode).then((resp) => {
                var a = resp.data.address
                this.addressLine1 = a.BLK_NO + " " + a.ROAD_NAME
                if (a.BUILDING != "NIL") {
                    this.addressLine2 = a.BUILDING
                } else {
                    this.addressLine2 = ""
                }
                this.automatedAddress = true
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
        checkCurrentPassword() {
            let r = this.$axios.post(this.userAPI + "/check_password/" + this.$auth.user.user_id, {
                "current_password": this.currentPassword
            }).then(() => {
                this.currentPwErrors = false
                this.uiLabels.currentPassword = "is-success"
                this.uiLabels.currentPasswordFieldMessage = "Your current password is correct."
            }).catch((error) => {
                this.uiLabels.currentPassword = "is-danger"
                this.uiLabels.currentPasswordFieldMessage = "Key in the correct current password."
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 2000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
        checkPassword() { 
            // checks new password field
            if (this.password != "") {
                var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
                if (this.password.match(passw)) {
                    this.pwErrors = false
                    this.uiLabels.password = "is-success"
                    this.uiLabels.passwordFieldMessage = "Good to go!"
                }
                else { 
                    this.snackbarAlert('Your password has to be at least 8 characters, and contains an uppercase letter and a numeric digit', "is-danger", 5000)
                    this.pwErrors = true
                    this.uiLabels.password = "is-danger"
                    this.uiLabels.passwordFieldMessage = "Your password doesn't meet the requirements."
                }
            }
        },
        checkIsSamePassword() {
            if (this.cPassword == "" || this.password != this.cPassword ) {
                this.cPwErrors = true
                this.snackbarAlert("Passwords doesn't match", "is-danger", 10000)
                this.uiLabels.cPassword = "is-danger"
                this.uiLabels.cPasswordFieldMessage = "Password doesn't match."
            } else {
                this.cPwErrors = false
                this.uiLabels.cPassword = "is-success"
                this.uiLabels.cPasswordFieldMessage = "Good to go!"
            }
        },
        submitAccountUpdate() {
            if (!this.currentPwErrors && !this.pwErrors && !this.cPwErrors) {
                let r = this.$axios.post(this.userAPI + "/update_password/" + this.$auth.user.user_id, {
                    "current_password": this.currentPassword,
                    "password": this.password
                }).then((response) => {
                    this.currentPassword = ""
                    this.password = ""
                    this.cPassword = ""
                    this.toastAlert("Password updated!", "is-success", 2000)
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 2000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            }
        },
        submitProfileUpdate() {
            let r = this.$axios.post(this.USERAPI + "/profile", {
                "description": this.description,
                "profilePhotoFile": this.profilePhotoString,
            }).then((resp) => {
                this.toastAlert("Profile has been updated!", "is-success", 5000)
                this.getInfo()
                this.deleteDropFile()
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 2000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
        submitInformationUpdate() {
            let r = this.$axios.post(this.USERAPI + "/profile", {
                "nric": this.nric,
                "firstName": this.fName,
                "lastName": this.lName,
                "phoneNo": this.countryCode + " " + this.phoneNo,
                "gender": this.gender,
                "birthday": this.birthDate,
                "postalCode": this.postalCode,
                "addressLine1": this.addressLine1,
                "addressLine2": this.addressLine2,
            }).then((resp) => {
                this.toastAlert("Profile has been updated!", "is-success", 5000)
                this.getInfo()
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 2000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
        checkPassword() { 
            if (this.password != "") {
                var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
                if (this.password.match(passw)) {
                    this.pwErrors = false
                    this.uiLabels.password = "is-success"
                }
                else { 
                    this.snackbarAlert('Your password has to be at least 8 characters, and contains an uppercase letter and a numeric digit', "is-danger", 5000)
                    this.pwErrors = true
                    this.uiLabels.password = "is-danger"
                }
            }
        },
        checkIsSamePassword() {
            if (this.cPassword == "" || this.password != this.cPassword ) {
                this.cPwErrors = true
                this.snackbarAlert("Password doesn't match", "is-danger", 10000)
                this.uiLabels.cPassword = "is-danger"
            } else {
                this.cPwErrors = false
                this.uiLabels.cPassword = "is-success"
            }
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
    },
}
</script>

<style scoped>
    hr {
        margin: 5rem 0;
    }
</style>