<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    window.electronProcess.ipcRenderer.send('fullscreen', true);
    // 这里ipcRenderer.on会报错，后续考虑用 ipcRenderer.invoke; 主进程用ipcMain.handle配置
    window.electronProcess.ipcRenderer.on('reply-fullscreen', (event, arg) => {
        // event事件对象，有很多自定义方法，args是send发送的参数
      console.log(event, arg)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
