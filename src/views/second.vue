<template>
    <div class="container">
      <p>根据提示，用焓湿图确定空气露点湿度</p>
      <canvas ref="canvasref" width="600" height="500"></canvas>
      <button v-show="onebutton" @click="handleOne">点击高光按钮</button>
      <button v-show="twobutton" @click="handleTwo">下一步</button>
      <button v-show="threebutton" @click="handleThree">下一步</button>
      <button v-show="huanyuan" @click="handleHuanyuan">还原</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const canvasref = ref(null);
  const onebutton = ref(true);
  const twobutton = ref(false);
  const threebutton = ref(false);
  const huanyuan = ref(false);
  let animationFrameId = null;
  
  onMounted(() => {
    drawAxes();
  });
  
  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
  
  function drawAxes() {
    const canvas = canvasref.value;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 500);
  
    // 绘制公共内容
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(320, 120, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  
    ctx.beginPath();
    ctx.moveTo(320, 400);
    ctx.lineTo(320, 120);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(120, 120);
    ctx.lineTo(320, 120);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(120, 300);
    ctx.lineTo(320, 300);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(250, 200);
    ctx.bezierCurveTo(280, 150, 360, 80, 450, 40);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(250, 380);
    ctx.bezierCurveTo(280, 330, 360, 260, 450, 220);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.arc(320, 300, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fill();
  
    if (one.value) {
      ctx.beginPath();
      ctx.arc(320, 120, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fill();
    }
  
    if (two.value) {
      animateLineY();
    }
  
    if (three.value) {
      animateLineX();
    }
  }
  
  function animateLineY() {
    const line = { x: 320, y1: 400, y2: 120 };
    const startTime = performance.now();
  
    function step() {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const progress = elapsedTime / 2000;
  
      if (progress > 1) progress = 1;
      const currentY = line.y1 + (line.y2 - line.y1) * progress;
  
      const canvas = canvasref.value;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 600, 500);
      drawAxes();
      ctx.beginPath();
      ctx.moveTo(120, 300);
      ctx.lineTo(320, currentY);
      ctx.strokeStyle = 'black';
      ctx.stroke();
  
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    }
  
    requestAnimationFrame(step);
  }
  
  function animateLineX() {
    const line = { y: 300, x1: 120, x2: 320 };
    const startTime = performance.now();
  
    function step() {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const progress = elapsedTime / 2000;
  
      if (progress > 1) progress = 1;
      const currentX = line.x1 + (line.x2 - line.x1) * progress;
  
      const canvas = canvasref.value;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 600, 500);
      drawAxes();
      ctx.beginPath();
      ctx.moveTo(320, 120);
      ctx.lineTo(currentX, 300);
      ctx.strokeStyle = 'black';
      ctx.stroke();
  
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    }
  
    requestAnimationFrame(step);
  }
  
  function handleOne() {
    onebutton.value = false;
    twobutton.value = true;
    one.value = true;
  }
  
  function handleTwo() {
    twobutton.value = false;
    threebutton.value = true;
    two.value = true;
  }
  
  function handleThree() {
    threebutton.value = false;
    huanyuan.value = true;
    three.value = true;
  }
  
  function handleHuanyuan() {
    huanyuan.value = false;
    three.value = false;
    one.value = false;
    two.value = false;
    onebutton.value = true;
    animationFrameId = null;
  }
  </script>
  
  <style scoped lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    height: 100vh;
    width: 100%;
    p {
      text-align: center;
      font-weight: 800;
    }
  }
  
  canvas {
    border: 1px solid #ccc;
  }
  
  button {
    cursor: pointer;
    width: 200px;
    height: 60px;
    background-color: #cdf9c4;
    border: none;
    border-radius: 10px;
  }
  
  button:hover {
    background-color: #b5daae;
  }
  </style>