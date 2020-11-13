<template>
    <section>
        <div size="120" class="user">
            <v-img :src="image_name" class="profile-img"></v-img>
            <v-icon class="icon primary white--text" @click="$refs.FileInput.click()">mdi-upload</v-icon>
            <input ref="FileInput" type="file" style="display: none;" @change="onFileSelect" />
        </div>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-text>
                    <VueCropper v-show="selectedFile" ref="cropper" :src="selectedFile" alt="Source Image"></VueCropper>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="primary" @click="saveImage(), (dialog = false)">Crop</v-btn>
                    <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>