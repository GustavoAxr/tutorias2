<script setup>
// import { ref, onMounted, onBeforeUnmount } from "vue";
// const cursors = ref(null);

// onMounted(() => {
//   observer.observe(navbar.value);
// });

// onBeforeUnmount(() => {
//   observer.disconnect();
// });

const cursor = document.querySelector(".cursor");
var timeout;
document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;

  cursor.style.top = y + "px";
  cursor.style.left = x + "px";
  cursor.style.display = "block";

  // function cursorStopped() {

  // }
});

document.addEventListener("mouseout", () => {
  cursor.style.display = "none";
});
</script>

<template>
  <div class="q-pa-md">
    <div ref="cursors" class="cursor"></div>
    <div class="row">
      <div class="col-6 flex">
        <q-avatar class="efecto" size="200px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div class="efecto text-h6">Gustavo Alexander Herrera Pérez</div>
      </div>
      <div class="col-6">
        <q-avatar class="efecto" size="200px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
      </div>
    </div>

    <div class="burbujas">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cursor {
  z-index: 999;
  position: fixed;
  background: #2696e8;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 20px #e8267d, 0 0 60px #8726e8, 0 0 100px #e83626;
  animation: colors 5s infinite;
  transform: translate(-50%, -50%);
}

@keyframes colors {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.cursor:before {
  content: "";
  position: absolute;
  background: #2696e8;
  width: 50px;
  height: 50px;
  opacity: 0.2;
  transform: translate(-30%, -30%);
  border-radius: 50%;
}

.efecto {
  text-align: center;
  animation: flotar 3s linear infinite alternate;
  box-shadow: 0px 0px 80px rgb(255, 255, 255);
}

@keyframes flotar {
  to {
    margin-top: 15vh;
  }
}

.burbujas div {
  z-index: 100;
  width: 20px;
  height: 20px;
  background: rgb(46, 141, 185);
  border-radius: 100%;
  position: absolute;
  bottom: 0;
  animation: animarBurbujas 4s linear infinite;
}

.burbujas div:nth-child(1) {
  width: 35px;
  height: 32px;
  left: 5%;
  animation-duration: 4s;
}
.burbujas div:nth-child(2) {
  width: 35px;
  height: 32px;
  left: 10%;
  animation-duration: 7s;
}
.burbujas div:nth-child(3) {
  width: 35px;
  height: 32px;
  left: 40%;
  animation-duration: 5s;
}
.burbujas div:nth-child(4) {
  width: 35px;
  height: 32px;
  left: 55%;
  animation-duration: 3s;
}
.burbujas div:nth-child(5) {
  width: 35px;
  height: 32px;
  left: 79%;
  animation-duration: 6s;
}
.burbujas div:nth-child(6) {
  width: 35px;
  height: 32px;
  left: 87%;
  animation-duration: 9s;
}
.burbujas div:nth-child(7) {
  width: 35px;
  height: 32px;
  left: 96%;
  animation-duration: 7s;
}
.burbujas div:nth-child(8) {
  width: 35px;
  height: 32px;
  left: 10px;
  animation-duration: 2s;
}

@keyframes animarBurbujas {
  0% {
    width: 0;
    height: 0;
  }
  30% {
    width: 30px;
    height: 27px;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: rotate(90deg);
    bottom: 100vh;
    background-color: blue;
  }
}
</style>
