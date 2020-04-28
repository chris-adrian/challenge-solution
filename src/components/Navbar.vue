<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <div class="container">
            <b-navbar-brand href="/">
                <img alt="Email archiver logo" src="../assets/logo.png">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    
                    <!-- <b-nav-item to="/about">About</b-nav-item > -->
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
export default {
    name: 'navbar'
}
</script>
    
<style>
    .navbar-brand img {
        max-width: 50px;
        width: 100%;
        height: auto;
    }
</style>