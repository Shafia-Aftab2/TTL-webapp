<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a class="back"><span>&#8592; </span>back</a>
      </div>
    </div>
    <div class="box-content">
      <div class="text-center box-header">
        <h1>Upgrade - Pricing</h1>
        <p></p>
        <p>When you upgrade your account, you get to:</p>
        <div class="box-benefits">
          <p>> Create up to 8 classes (max of 32 students)</p>
          <p></p>
          <p>> Access all features</p>
          <p></p>
          <p>> Set an unlimited number of questions across all topics</p>
          <p></p>
          <p>> Students get unlimited access to all quizzes (March 2022)</p>
          <p></p>
        </div>
        <div class="yellow-text">
          <p>Limited Offer</p>
        </div>
        <h2>£30 individual teacher / annual</h2>
        <h1>£2.50/month</h1>
        <p></p>

        <div class="talkie-stripe-payments-form-wrapper">
          <h3 class="h3">Add Payment Method</h3>
          <form
            class="talkie-stripe-payments-form"
            id="talkie-stripe-payments-form"
          >
            <div id="talkie-stripe-payments-element">
              <!-- Elements will create form elements here -->
            </div>
            <div
              class="talkie-stripe-payments-form-error-message-wrapper"
              id="talkie-stripe-payments-form-error-message-wrapper"
            >
              <!-- Display error message to your customers here -->
            </div>
            <talkie-button :type="'submit'">Submit</talkie-button>
          </form>
        </div>

        <div class="upgrade">
          <talkie-button>Upgrade</talkie-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";
export default {
  name: "ServicesUpgrade",
  components: { TalkieButton },
};
</script>

<style scoped>
.talkie-stripe-payments-form-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--t-space-24);
}
.talkie-stripe-payments-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--t-space-16);
}
.talkie-stripe-payments-form-error-message-wrapper {
  color: var(--t-red);
  font-size: var(--t-fs-small);
}

.box-benefits {
  text-align: left;
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
  margin-top: 20px;
  margin-left: 245px;
}
.box-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 var(--t-space-50) 0;
  gap: 10px;
}
.box-content {
  display: grid;
  width: 100%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-70);
  gap: 10px;
  margin-top: 20px;
}
.box-header {
  display: grid;
  gap: 10px;
}
.box-head {
  display: flex;
  justify-content: space-between;
}
.bar-outline {
  background-color: var(--t-white);
  padding: var(--t-space-16);
  border-radius: var(--t-space-10);
  border: 2px solid var(--t-gray-home);
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-style {
  font-size: 20px;
  color: var(--t-secondary);
}
.upgrade {
  font-weight: bold;
}
.yellow-text {
  color: rgb(255, 166, 0);
  font-size: 20px;
  font-weight: bold;
}
.back {
  text-decoration: none;
}
@media (max-width: 599px) {
  .box-content {
    width: 100%;
  }
  .box-container {
    padding: 110px 15px var(--t-space-50) 10px;
  }
}

@media (min-width: 600px) {
  .content {
    width: 50%;
    padding: var(--t-space-10);
  }
  .back-default {
    position: absolute;
    left: 160px;
  }
}

@media (min-width: 900px) {
  .content {
    width: 35%;
    padding: var(--t-space-50);
  }
}

@media (min-width: 1200px) {
  .back-default {
    position: absolute;
    left: 5px;
  }
}
</style>
