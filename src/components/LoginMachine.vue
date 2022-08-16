<script setup lang="ts">
import ButtonNormal from "./common/ButtonNormal.vue";
</script>

<template>
  <!-- <Transition> -->
  <div class="fixed-layer flex-center-center bg-black/30 backdrop-blur-[2px]">
    <div class="pb-8 rounded-2xl bg-zinc-700">
      <div class="flex-center-center pb-5 rounded-2xl bg-zinc-600">
        <div class="monitor-fixture">
          <div v-for="i in 5" :key="i" class="groove" />
        </div>

        <div class="relative">
          <div class="monitor-frame">
            <div class="monitor-screen">
              <div class="stripe" />
              <div v-if="true">
                <div class="font-bold italic text-2xl text-center">WELCOME</div>
                <div class="w-[250px] mx-auto">
                  <div class="text-sm mt-3">電子信箱</div>
                  <input type="text" class="my-1" />
                  <div class="text-xs text-right">123</div>

                  <div class="text-sm">密碼</div>
                  <input type="text" class="my-1" />
                  <div class="text-xs text-right">123</div>

                  <div class="flex-center-center text-sm mt-4">
                    <div class="mr-10 border-b-[1px] border-[#13fc5c]">
                      忘記密碼
                    </div>
                    <div class="border-b-[1px] border-[#13fc5c]">註冊</div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="w-[250px] mx-auto">
                  <div class="text-sm mt-2">名稱</div>
                  <input type="text" class="my-1" />
                  <div class="text-xs text-right">123</div>

                  <div class="text-sm">電子信箱</div>
                  <input type="text" class="my-1" />
                  <div class="text-xs text-right">123</div>

                  <div class="text-sm">密碼</div>
                  <input type="text" class="my-1" />
                  <div class="text-xs text-right">123</div>
                </div>
              </div>
            </div>
          </div>

          <div class="button-module">
            <div class="rounded-t-2xl rounded-b-md bg-zinc-600">
              <div class="flex-between-center px-5 pt-3 pb-3">
                <ButtonNormal
                  theme="confirm"
                  text="登入"
                  :width="100"
                  :height="35"
                  class="font-bold"
                />
                <ButtonNormal
                  theme="cancel"
                  text="取消"
                  :width="100"
                  :height="35"
                  class="font-bold"
                />
              </div>
              <div class="flex-center-center">
                <div
                  v-for="i in 7"
                  :key="i"
                  class="w-[10px] h-5 mx-2 -mb-2 rounded-t-full bg-black/20 shadow-inner-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="monitor-fixture">
          <div v-for="i in 5" :key="i" class="groove" />
        </div>
      </div>
    </div>
  </div>
  <!-- </Transition> -->
</template>

<style scoped lang="scss">
.monitor-frame {
  @apply -mt-6 p-5 border-8 border-zinc-600 rounded-xl bg-zinc-700 shadow-light;
  box-shadow: theme("boxShadow.inner-lg"), theme("boxShadow.md");
}

.monitor-screen {
  @apply relative w-[300px] h-[280px] p-3 rounded-xl bg-[#213821] text-[#13fc5c] overflow-hidden;

  .stripe {
    background-image: repeating-linear-gradient(
      transparent,
      transparent 8px,
      rgba(0, 0, 0, 0.08) 8px,
      rgba(0, 0, 0, 0.08) 11px
    );
    @apply absolute-default full shadow-inner-sm pointer-events-none;
  }

  input {
    @apply w-full text-sm px-2 py-1 border-[1px] border-[#13fc5c] bg-transparent focus-visible:outline-none;
  }
}

.monitor-fixture {
  @apply flex justify-between flex-col w-8 h-[100px] -mx-1 py-4 px-1 rounded-md bg-zinc-700 shadow-md;

  .groove {
    @apply h-1 rounded-full shadow-inner-md;
  }
}

.button-module {
  @apply relative w-[260px] mx-auto -mt-10 pb-2 rounded-t-2xl rounded-b-md bg-zinc-700 shadow-sm shadow-dark;
}
</style>
