<template>
<div id="app">
  <nav>
      <ul>
          <ol><router-link to="/index" exact>一只小绵羊🐑</router-link></ol>
          <ol><router-link to="/home">一条小蛇🐍</router-link></ol>
          <ol><router-link to="/user/11">一个大灰狼🐺</router-link></ol>
      </ul>
  </nav>
  <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
    ul > ol {
        font-size: 28px;
        color: darksalmon
    }
</style>


