<template>
    <div class="container">
      <svg
        xmlns="http://www.w3.org/2000/svg"   
        xmlns:xlink="http://www.w3.org/1999/xlink"   
        fill="none"
        version="1.1"
        width="758.904296875"
        height="775.4187622070312"
        viewBox="0 0 758.904296875 775.4187622070312"
        class="svg-container"
      >
        <g>
          <!-- t-b -->
          <g>
            <line
              class="tb-animation"
              x1="0"
              y1="564.1471557617188"
              x2="398"
              y2="564.1471557617188"
              fill-opacity="0"
              stroke-opacity="1"
              stroke="#000000"
              fill="none"
              stroke-width="3"
            />
          </g>
        </g>
      </svg>
  
      <button @click="handleT">Toggle Line</button>
      
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  const three = ref(false);
  
  function handleT() {
    three.value = !three.value;
    triggerAnimation();
  }
  
  onMounted(() => {
    // 初始不执行动画
  });
  
  // 用于触发动画的函数
  function triggerAnimation() {
    const line = document.querySelector('.tb-animation');
    if (line) {
      const length = line.getTotalLength();
      if (three.value) {
        // 显示线条
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;
        line.style.transition = 'stroke-dashoffset 2s ease-in-out';
        line.style.strokeDashoffset = '0';
      } else {
        // 隐藏线条
        line.style.transition = 'stroke-dashoffset 0s ease-in-out';
        line.style.strokeDashoffset = `-${length}`;
      }
    } else {
      console.error('Line element not found');
    }
  }
  </script>
  
  <style scoped lang="scss">
  .container {
    width: 100%;
    max-width: 758.904296875px;
    margin: auto;
  }
  
  .svg-container {
    width: 100%;
    height: auto;
  }
  
  .tb-animation {
    stroke-dasharray: 398;
    stroke-dashoffset: -398; // 初始偏移量设置为线条长度
  }
  </style>