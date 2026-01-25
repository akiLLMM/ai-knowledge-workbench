<script lang="ts" setup>
import type { FormRules } from "element-plus"
import type { LoginRequestData } from "./apis/type"
import { Key, Loading, Lock, Picture, User } from "@element-plus/icons-vue"
import { useUserStore } from "@/pinia/stores/user"
import { getCaptchaApi, loginApi } from "./apis"

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

/** 登录表单元素的引用 */
const loginFormRef = useTemplateRef("loginFormRef")

/** 登录按钮 Loading */
const loading = ref(false)

/** 验证码图片 URL */
const codeUrl = ref("")
/** 本地验证码文本 */
const captchaText = ref("")

/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: "admin",
  password: "12345678",
  code: ""
})

/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" }
  ]
}

/** 登录 */
function handleLogin() {
  loginFormRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }

    // 本地验证码校验
    if (loginFormData.code.trim().toLowerCase() !== captchaText.value.toLowerCase()) {
      ElMessage.error("验证码错误")
      createCode()
      loginFormData.code = ""
      return
    }

    loading.value = true
    loginApi(loginFormData).then(({ data }) => {
      userStore.setToken(data.token)
      router.push(route.query.redirect ? decodeURIComponent(route.query.redirect as string) : "/")
    }).catch(() => {
      createCode()
      loginFormData.password = ""
    }).finally(() => {
      loading.value = false
    })
  })
}

/** 创建验证码（接口获取） */
async function createCode() {
  loginFormData.code = ""
  try {
    const { data } = await getCaptchaApi()
    codeUrl.value = data
  } catch {
    ElMessage.error("验证码获取失败")
  }
}

// 初始化验证码
createCode()
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="brand">
        <!-- 替换为你的 logo 路径 -->
        <img class="brand-logo" src="@@/assets/images/layouts/Klogo-text-2.png" alt="logo">
        <div class="brand-title">
          AI Knowledge Workbench
        </div>
        <div class="brand-subtitle">
          面向个人的 RAG 轻量工作台
        </div>
      </div>

      <div class="form-area">
        <el-form
          ref="loginFormRef"
          :model="loginFormData"
          :rules="loginFormRules"
          @keyup.enter="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>

          <el-form-item prop="code">
            <el-input
              v-model.trim="loginFormData.code"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
            >
              <template #append>
                <el-image :src="codeUrl" draggable="false" @click="createCode">
                  <template #placeholder>
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </template>
                  <template #error>
                    <el-icon>
                      <Loading />
                    </el-icon>
                  </template>
                </el-image>
              </template>
            </el-input>
          </el-form-item>

          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">
            登 录
          </el-button>
        </el-form>

        <div class="form-hint">
          默认账号：admin / editor · 密码：12345678
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #f7f9fc 0%, #ffffff 100%);
  padding: 24px;
  position: relative;

  .theme-switch {
    position: fixed;
    top: 24px;
    right: 24px;
    cursor: pointer;
  }
}

.login-card {
  width: 420px;
  max-width: 92vw;
  border-radius: 16px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  box-shadow: 0 8px 32px rgba(16, 24, 40, 0.08);
  padding: 28px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .brand-logo {
    height: 44px;
    object-fit: contain;
  }

  .brand-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    letter-spacing: 0.2px;
  }

  .brand-subtitle {
    font-size: 13px;
    color: var(--el-text-color-secondary);
  }
}

.form-area {
  :deep(.el-input-group__append) {
    padding: 0;
    overflow: hidden;
    .el-image {
      width: 104px;
      height: 40px;
      border-left: 0;
      user-select: none;
      cursor: pointer;
      text-align: center;
      background: var(--el-fill-color-light);
    }
  }

  .el-button {
    width: 100%;
    margin-top: 6px;
  }
}

.form-hint {
  margin-top: 10px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
  text-align: center;
}

/* 暗色模式优化 */
:global(.dark) .login-container {
  background: linear-gradient(180deg, #0f1115 0%, #14171d 100%);
}

:global(.dark) .login-card {
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}
</style>
