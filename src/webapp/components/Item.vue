<template>
  <div>{{ user.desr }}</div>
</template>
<script>
import { mapGetters } from "vuex";

const fetchInitialData = ({ store, route }) => {
  console.log("获取的路由数据", route.params.id);
  return store.dispatch(`getUser`);
};
export default {
  asyncData: fetchInitialData,
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },
  mounted() {
    fetchInitialData({ store: this.$store, route: this.$route });
  }
};
</script>