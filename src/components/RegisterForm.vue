<template>
  <div class="text-white text-center font-bold p-4 mb-4" v-if="alert.show" :class="alert.variant">
    {{ alert.msg }}
  </div>
  <!-- Registration Form -->
  <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
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
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antartica">Antartica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
    </div>
    <ErrorMessage class="text-red-600" name="tos" />
    <button
      type="submit"
      :class="{
        'block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700': true,
        'cursor-not-allowed': in_submission
      }"
      :disabled="in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const storeAuth = useAuthStore()

const schema = ref({
  name: 'required|min:3|max:100|alpha_spaces',
  email: 'required|min:3|max:100|email',
  age: 'required|min_value:18|max_value:100',
  password: 'required|min:3|max:36|excluded:password',
  confirm_password: 'password_mismatch:@password',
  country: 'required|country_excluded:Antartica',
  tos: 'tos'
})

const userData = {
  country: 'USA'
}

const in_submission = ref(false)
const alert = ref({
  show: false,
  variant: 'bg-blue-500',
  msg: 'Please wait! Your account is being created.'
})

const register = async (values) => {
  alert.value.show = true
  in_submission.value = true
  alert.value.variant = 'bg-blue-500'
  alert.value.msg = 'Please wait! Your account is being created.'

  try {
    await storeAuth.register(values)
  } catch (error) {
    in_submission.value = false
    alert.value.variant = 'bg-red-500'
    alert.value.msg = 'An unexpected error occured. Please try again later.'
    console.error(error)
    return
  }

  alert.value.variant = 'bg-green-500'
  alert.value.msg = 'Success! Your account has been created.'
  console.log('registered: ', values)
}
</script>
