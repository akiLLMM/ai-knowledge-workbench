import { askRag } from "@/pages/chat/services/rag.service.ts"

export interface ChatContext {
  question: string
  knowledge: { id: string, title: string }[]
}

export type StreamCallback = (chunk: string) => void

export async function chatStream(
  context: ChatContext,
  onChunk: StreamCallback
) {
  if (import.meta.env.PROD) {
    return localStream(context, onChunk)
  } else {
    return apiStream(context, onChunk)
  }
}

async function apiStream(
  context: ChatContext,
  onChunk: StreamCallback
) {
  const res = await fetch("/api/chat/stream", {
    method: "POST",
    body: JSON.stringify(context)
  })

  const reader = res.body?.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader!.read()
    if (done) break
    onChunk(decoder.decode(value))
  }
}

async function localStream(
  context: ChatContext,
  onChunk: StreamCallback
) {
  const result = await askRag(context)

  for (const ch of result.answer) {
    onChunk(ch)
    await new Promise(r => setTimeout(r, 20))
  }
}
