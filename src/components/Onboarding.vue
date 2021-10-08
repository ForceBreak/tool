<template>
  <div class="container">
    <h2>Almost there!</h2>
    <p>Would you mind answering these two questions?</p>
    <FormulateForm 
      v-model="onboardingForm"
      @submit="submitOnboarding()">

      <FormulateInput
        v-model="research_field"
        :options="{disinfo: 'Disinformation Research', journalism: 'Journalism', marketing: 'Marketing Research', influencer: 'Influencer Research', else: 'Something Else'}"
        type="select"
        placeholder="Select an option"
        label="For what will you be using RadiTube?"
      />

      <div v-if="research_field === 'else'">
        <p>We are still discovering all the potential use cases for RadiTube? We'd be super curious to hear what you'd like to use RadiTube for:</p>
      
        <FormulateInput
          type="textarea"
          v-model="different_usecase"
          label="I'd like to use RadiTube for:"
          validation="max:50,length"
          :help="`Keep it under 50 characters. ${50 - different_usecase.length} left.`"
        />
      </div>

      <FormulateInput
        v-model="research_place"
        :options="{first: 'Academia', second: 'Company', third: 'Governmental', fourth: 'NGO', fourth: 'Freelancer', student: 'Student', else: 'Something Else'}"
        type="select"
        placeholder="Select an option"
        label="Where do you work?"
      />

      <FormulateInput
        v-model="email_premission"
        type="checkbox"
        label="I'd like to be informed with updates and tips"
      />

      <FormulateInput
        type="submit"
        label="Start using RadiTube"
      />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  name: 'Onboarding',
  data () {
    return {
      onboardingForm: {},
      research_field: '',
      research_place: '',
      different_usecase: '',
      email_premission: false
    }
  },
  methods: {
    submitOnboarding() {
      console.log(this.research_field);
      console.log(this.research_place);
    }
  }
}
</script>

<style scoped>

</style>