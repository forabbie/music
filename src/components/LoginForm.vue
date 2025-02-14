<template>
  <div class="text-white text-center font-bold p-4 mb-4" v-if="alert.show" :class="alert.variant">
    {{ alert.msg }}
  </div>
  <!-- Login Form -->
  <vee-form :validation-schema="schema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script setup>
import { ref } from 'vue'

const schema = ref({
  email: 'required|email',
  password: 'required|min:3|max:36'
})

const in_submission = ref(false)
const alert = ref({
  show: false,
  variant: 'bg-blue-500',
  msg: 'Please wait! Your account is being created.'
})

const login = (values) => {
  alert.value.show = true
  in_submission.value = true

  alert.value.variant = 'bg-green-500'
  alert.value.msg = 'Success! Your account has been created.'
  console.log('login: ', values)
}
</script>
