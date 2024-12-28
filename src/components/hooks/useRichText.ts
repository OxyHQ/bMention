import React from 'react'
import {RichText} from 'src/fakeData'

import {useAgent} from '#/state/session'

export function useRichText(text: string): [RichText, boolean] {
  const [prevText, setPrevText] = React.useState(text)
  const [rawRT, setRawRT] = React.useState(() => new RichText({text}))
  const [resolvedRT, setResolvedRT] = React.useState<RichText | null>(null)
  const agent = useAgent()
  if (text !== prevText) {
    setPrevText(text)
    setRawRT(new RichText({text}))
    setResolvedRT(null)
    // This will queue an immediate re-render
  }
  React.useEffect(() => {
    let ignore = false
    async function resolveRTFacets() {
      // new each time
      const resolvedRT = new RichText({text})
      await resolvedRT.detectFacets(agent)
      if (!ignore) {
        setResolvedRT(resolvedRT)
      }
    }
    resolveRTFacets()
    return () => {
      ignore = true
    }
  }, [text, agent])
  const isResolving = resolvedRT === null
  return [resolvedRT ?? rawRT, isResolving]
}
