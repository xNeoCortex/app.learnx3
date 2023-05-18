import {
    create
} from 'zustand'
import {
    persist
} from 'zustand/middleware'


const useStoreTemporary = create((set) => ({
    class_id: null,
    setClassId: (class_id) => set({
        class_id: class_id
    }),
    classInfo: null,
    setClassInfo: (class_) => set({
        classInfo: class_
    }),
    sidebarWidth: 300,
    setSidebarWidth: (width) => set({
        sidebarWidth: width
    })
}))


const useStore = create(
    persist(
        (set) => ({
            lessonState: [],
            setLessonState: (session) => set((state) => ({
                lessonState: session
            })),
            removeSessions: () => set({
                lessonState: []
            }),
        }), {
            name: 'english-lesson', // unique name
            getStorage: () => sessionStorage,
        }
    )
)


const useStoreUser = create(
    persist(
        (set, get) => ({
            userInfo: {},
            setUserInfo: (user) => set({
                userInfo: user
            }),
            userLogin: {},
            setUserLogin: (user) => set({
                userLogin: user
            }),
        }), {
            name: 'current-user', // unique name
            getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
        }
    )
)



export {
    useStore,
    useStoreTemporary,
    useStoreUser
}