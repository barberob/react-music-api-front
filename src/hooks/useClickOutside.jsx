import { useRef, useEffect } from 'react'

const useClickOutside = (handler) => {
    const ref = useRef(null)
    const handleClickOutside = (e) => {
        const node = ref.current
        if (node && node.contains(e.target)) return
        handler()
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return ref
}

export default useClickOutside