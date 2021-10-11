<template>
  <div class="container">
    <h2>Almost there!</h2>
    <p>Would you mind answering these two questions?</p>
    <FormulateForm @submit="submitOnboarding()">
      <FormulateInput
        v-model="research_area"
        :options="settings.research_area"
        type="select"
        placeholder="Select an option"
        label="For what will you be using RadiTube?"
      />

      <div v-if="research_area === 'else'">
        <p>
          We are still discovering all the potential use cases for RadiTube?
          We'd be super curious to hear what you'd like to use RadiTube for:
        </p>

        <FormulateInput
          type="textarea"
          v-model="alt_research_area"
          label="I'd like to use RadiTube for:"
          validation="max:50,length"
          :help="`Keep it under 50 characters. ${
            50 - alt_research_area.length
          } left.`"
        />
      </div>

      <FormulateInput
        v-model="research_place"
        :options="settings.workplace"
        type="select"
        placeholder="Select an option"
        label="Where do you work?"
      />

      <FormulateInput
        v-model="email_premission"
        type="checkbox"
        label="I'd like to be informed with updates and tips"
      />

      <FormulateInput type="submit" label="Start using RadiTube" />

      I'll answer these questions next time.
    </FormulateForm>
  </div>
</template>

<script>
import settings from "../../settings.json";
import axios from "axios";

export default {
  name: "Onboarding",
  data() {
    return {
      settings: settings,
      research_area: "",
      research_place: "",
      alt_research_area: "",
      email_premission: false,
    };
  },
  methods: {
    submitOnboarding() {
      this.$auth.getTokenSilently().then((res) => {
        console.log(res);

        const { data } = axios.post(
          `${process.env.VUE_APP_API_DOMAIN}/onboarding`,
          {
            research_area: this.research_area,
            workplace: this.research_place,
            alt_research_area: this.alt_research_area,
            email_premission: this.email_premission,
          },
          {
            headers: {
              Authorization: `Bearer ${res}`,
            },
          }
        );

        console.log(JSON.parse(data));
      });

      // axios post to endpoint
      // set onboarding to false
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>