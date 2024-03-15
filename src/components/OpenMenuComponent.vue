<template>
    <div class="btn-menu" style="position: absolute; right: 10px; top: 10px;"
        @click="this.$store.commit('toggleMenu', !this.$store.state.isMenuOpen);">
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.61 147.52">
            <rect class="cls-1" x="0" y="60" width="192.61" height="27.52" rx="13.76" ry="13.76" />
            <rect class="cls-1" x="0" y="120" width="192.61" height="27.52" rx="13.76" ry="13.76" />
            <rect class="cls-1" x="0" y="0" width="192.61" height="27.52" rx="13.76" ry="13.76" />
        </svg>
    </div>
</template>

<script>

</script>

<style scoped>
.btn-menu {
    position: absolute;
    left: 0;
    margin: 10px;
    margin-left: 20px;
    z-index: 9;
    width: 45px;
    height: 45px;
    cursor: pointer;
}

.btn-menu svg {
    fill: rgb(255, 255, 255);
    background-color: #000000;
    filter: invert(1);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
}
</style>