<template>
  <div id="footer">
    <div class="centerX centerY">
      <p id="email">hi@myWebsite.com</p>
      <div id="copyrights">
        <p>&copy; 2019 Website</p>
        <p>All rights reserved</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #footer {
    background-color: var(--color-blue);
    color: var(--color-white);
    height: 150px;
    text-align: center;
  }

  #copyrights {
    font-weight: 100;
    line-height: 5px;
    font-size: 14px;
  }

  #email {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }
</style>
