<script setup>
import Logo from '../assets/logo.png'
</script>

<template>
  <section class="container-about-section">
    <h1 class="mobile-content about-header-1">About</h1>
    <h1 class="not-mobile-content about-header-1">About DTT Real Estate</h1>
    <h2 class="mobile-content about-header-2">About DTT Real Estate</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu scelerisque lectus. Ut
      elementum pulvinar velit, et efficitur arcu finibus maximus. Nullam vitae tempor leo. Praesent
      lobortis vitae ante vitae consequat. Integer lobortis, magna sit amet mattis malesuada, ante
      libero luctus leo, eu fringilla libero metus sed orci. Vivamus eget molestie felis. Sed eu est
      quis metus sodales tempus. In auctor imperdiet odio, in tempus leo. Donec et ligula ornare,
      viverra dolor non, posuere nulla.
    </p>
    <p>
      Integer non nisi tristique, pharetra augue eget, iaculis leo. Donec sit amet dictum ligula. Ut
      tortor risus, molestie a eros ac, lobortis aliquam urna. Vivamus libero tortor, dignissim a
      sagittis ut, sagittis sed nunc. Donec at porta mi. Donec pulvinar magna in fringilla maximus.
      Sed tempus lorem non gravida fermentum.
    </p>
    <h1 class="design-development-header not-mobile-content about-header-1">
      Design and Development
    </h1>
    <h2 class="mobile-content about-header-2 sub-header">Design and Development</h2>
    <div class="container-development-info">
      <div class="container-logo"><img :src="Logo" alt="DTT Logo" /></div>
      <div class="link-container">
        <div>By DTT</div>
        <div><a href="https://www.d-tt.nl/" target="_blank">www.d-tt.nl</a></div>
      </div>
    </div>
  </section>
</template>

<style>
.container-about-section {
  width: 1320px;
  margin: 70px auto 0;
}

.about-header-1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
}

.container-about-section p {
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin-top: 30px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.design-development-header {
  margin-top: 60px;
}

.container-development-info {
  display: flex;
  align-items: center;
  margin-top: 30px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: var(--text-secondary);
}
.container-development-info a {
  color: var(--text-hyperlink);
  text-decoration: none;
}

.container-logo {
  margin-right: 30px;
}

.container-logo img {
  width: 250px;
}

.link-container div {
  margin: 5px 0;
}

@media only screen and (max-width: 1400px) {
  .container-about-section {
    width: 1000px;
  }
}

@media only screen and (max-width: 1050px) {
  .container-about-section {
    width: 800px;
  }
}

@media only screen and (max-width: 850px) {
  .container-about-section {
    width: 500px;
  }
}

@media only screen and (max-width: 550px) {
  .container-about-section {
    width: 350px;
    margin-top: 50px;
  }

  .container-logo img {
    width: 200px;
  }
}

@media only screen and (max-width: 375px) {
  .container-about-section {
    width: 320px;
    margin-top: 30px;
  }

  .about-header-1 {
    font-size: 18px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .about-header-2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 700;
  }

  .container-about-section p {
    font-size: 12px;
    margin-top: 15px;
  }

  .sub-header {
    margin-top: 40px;
  }

  .container-development-info {
    font-size: 14px;
    margin-top: 20px;
  }

  .container-logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-logo img {
    width: 100px;
  }

  .link-container div {
    display: flex;
    align-items: center;
    margin: 1px 0;
  }
}
</style>
