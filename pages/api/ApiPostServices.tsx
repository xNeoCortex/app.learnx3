import { collection, query, where, doc } from "firebase/firestore"
import { db } from "../firebaseX"
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore"
import { useQueryClient } from "react-query"

function ApiPostServices() {
  const queryClient = useQueryClient()
  function submitEssay() {
    const ref = collection(db, "essayResult")
    const mutation = useFirestoreCollectionMutation(ref, {
      onSuccess() {
        queryClient.invalidateQueries(["essayResult"])
      },
    })
    return mutation
  }

  function submitTest() {
    const ref = collection(db, "testResult")

    const mutation = useFirestoreCollectionMutation(ref, {
      onSuccess() {
        queryClient.invalidateQueries(["testResult"])
      },
    })

    return mutation
  }

  function addClass() {
    const ref = collection(db, "classes")

    const mutation = useFirestoreCollectionMutation(ref, {
      onSuccess() {
        queryClient.invalidateQueries(["classes"])
      },
    })

    return mutation
  }

  function updateClass(id) {
    const collectionX = collection(db, "classes")
    const ref = doc(collectionX, id)

    const mutation = useFirestoreDocumentMutation(ref, {
      merge: true,
    })

    return mutation
  }
  function updateTeacherInfo(id) {
    const collectionX = collection(db, "teachers")
    const ref = doc(collectionX, id)

    const mutation = useFirestoreDocumentMutation(ref, {
      merge: true,
    })

    return mutation
  }

  function submitFeedback(id: string) {
    const collectionX = collection(db, "essayResult")
    const ref = doc(collectionX, id)

    const mutation = useFirestoreDocumentMutation(ref, {
      merge: true,
      // onSuccess() {
      //   queryClient.invalidateQueries(["essayResult"])
      // },
    })
    return mutation
  }

  return {
    submitEssay,
    submitTest,
    addClass,
    updateClass,
    updateTeacherInfo,
    submitFeedback,
  }
}

export default ApiPostServices
