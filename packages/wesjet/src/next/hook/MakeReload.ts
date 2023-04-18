/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the  LICENSE file in the root directory of this source tree.
 *
 */

import { addMessageListener } from 'next/dist/client/dev/error-overlay/websocket.js'
import { useRouter } from 'next/router.js'

import React from 'react'

export const MakeReload = () => {
  const router = useRouter()

  const routePathRef = React.useRef<string | undefined>(router.asPath)
  React.useEffect(() => {
    routePathRef.current = router.asPath
  }, [router.asPath])

  React.useEffect(() => {
    let lastBuiltHash: string | undefined

    addMessageListener((e: any) => {
      const isRouteActive = routePathRef.current !== undefined
      if (isRouteActive && e.type === 'message' && typeof e.data === 'string') {
        const data = JSON.parse(e.data)

        const dataHasChanged = data.hash !== lastBuiltHash && data.hash !== undefined
        if ((data.action === 'built' || data.action === 'sync') && dataHasChanged) {
          router.replace(routePathRef.current!, undefined, { scroll: false })

          lastBuiltHash = data.hash
        }
      }
    })

    return () => {
      routePathRef.current = undefined
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [routePathRef])
}
