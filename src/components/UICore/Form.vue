<template>
  <form :class="[customClass.toString()]" @submit="handleFormSubmit">
    <slot
      :errors="errors"
      :isSubmitting="isSubmitting"
      :submitCount="submitCount"
      :state="state"
      :values="values"
      :setError="setError"
      :setErrors="setErrors"
      :setValue="setValue"
      :setValues="setValues"
      :validate="validate"
      :submitForm="submitForm"
      :resetForm="resetForm"
      :triggerFormSubmit="triggerFormSubmit"
    />
  </form>
</template>

<script>
import { useForm } from "vee-validate";

export default {
  name: "TalkieForm",
  data() {
    const {
      errors,
      isSubmitting,
      submitCount,
      meta: state,
      values,
      setFieldError: setError,
      setErrors,
      setFieldValue: setValue,
      setValues,
      validate,
      handleSubmit,
      submitForm,
      handleReset,
      resetForm,
    } = useForm({
      validationSchema: this.validationSchema,
      initialErrors: this.initialErrors,
      initialValues: this.initialValues,
      initialTouched: this.initialTouched,
      validateOnMount: this.validateOnMount,
    });

    return {
      errors,
      isSubmitting,
      submitCount,
      state,
      values,
      setError,
      setErrors,
      setValue,
      setValues,
      validate,
      handleSubmit,
      submitForm,
      handleReset,
      resetForm,
    };
  },
  props: {
    validationSchema: {
      type: Object,
      default: () => ({}),
    },
    initialErrors: {
      type: Object,
      default: () => ({}),
    },
    initialValues: {
      type: Object,
      default: () => ({}),
    },
    initialTouched: {
      type: Object,
      default: () => ({}),
    },
    validateOnMount: {
      type: Boolean,
      default: false,
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  methods: {
    async handleFormSubmit(e) {
      e.preventDefault();
      await this.submitForm();
      if (Object.keys(this.errors).length === 0) {
        await this.onSubmit({ ...this.values });
      }
    },
    async triggerFormSubmit() {
      await this.submitForm();
      if (Object.keys(this.errors).length === 0) {
        await this.onSubmit({ ...this.values });
      }
    },
  },
};
</script>
