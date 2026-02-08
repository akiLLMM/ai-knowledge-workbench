import { delay, http, HttpResponse } from "msw"

function getDb() {
  const raw = localStorage.getItem("ai-workbench-knowledge-list")
  return raw ? JSON.parse(raw) : []
}

export const handlers = [
  // knowledge list
  http.get("/api/knowledge/list", async () => {
    await delay(300)
    return HttpResponse.json({
      code: 0,
      data: getDb()
    })
  }),

  // chat stream
  http.post("/api/chat/stream", async ({ request }) => {
    const body = (await request.json()) as { question: string, knowledge: { id: string, title: string }[] }

    await delay(300)

    const titles = body.knowledge?.map(k => `《${k.title}》`).join("、") || "（未选择知识）"
    const text = `【Mock Stream】\n问题：${body.question}\n参考：${titles}\n\n这是 MSW 模拟的流式输出。`

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        for (const ch of text) {
          controller.enqueue(encoder.encode(ch))
          await new Promise(r => setTimeout(r, 20))
        }
        controller.close()
      }
    })

    return new HttpResponse(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    })
  }),

  // 验证码 mock（如果未来切回接口验证码可启用）
  http.get("/auth/captcha", async () => {
    await delay(200)
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="104" height="40">
        <rect width="100%" height="100%" fill="#f5f7fa"/>
        <text x="52" y="26" text-anchor="middle" font-size="18" font-family="Arial" fill="#1f2d3d" letter-spacing="3">
          MOCK
        </text>
        <line x1="6" y1="8" x2="98" y2="32" stroke="#dcdfe6" />
        <line x1="8" y1="30" x2="96" y2="6" stroke="#dcdfe6" />
      </svg>
    `.trim()

    return HttpResponse.json({
      code: 0,
      data: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
    })
  })
]
