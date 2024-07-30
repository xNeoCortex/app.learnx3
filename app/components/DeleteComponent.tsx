import { Box, IconButton } from "@mui/material"
import { memo, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ApiServices from "@/api/ApiServices"
import LoadingPage from "./LoadingPage"
import ErrorPage from "@/errorpage"

const DeleteComponent: React.FC<{
	collectionName: string
	invalidateCache: string
	itemId: string
	setOpen: (open: boolean) => void
}> = memo(({ collectionName, invalidateCache, itemId, setOpen }) => {
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
	const queryClient = useQueryClient()
	const { apiRequest } = ApiServices()

	const {
		mutate: toDelete,
		isLoading,
		isError,
	} = useMutation((uid: string) => apiRequest("DELETE", null, { collectionName, uid }), {
		onSuccess: () => queryClient.invalidateQueries([invalidateCache]),
	})

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Box
			//@ts-ignore
			display="flex"
		>
			{!openConfirmDelete ? (
				<IconButton>
					<DeleteIcon
						onClick={() => setOpenConfirmDelete(true)}
						style={{
							color: "rgb(255 92 92)",
						}}
					/>
				</IconButton>
			) : (
				<>
					<IconButton>
						<CheckIcon
							onClick={() => (toDelete(itemId), setOpen(true), setOpenConfirmDelete(false))}
							style={{
								color: "black",
							}}
						/>
					</IconButton>
					<IconButton>
						<CloseIcon
							onClick={() => setOpenConfirmDelete(false)}
							style={{
								color: "black",
							}}
						/>
					</IconButton>
				</>
			)}
		</Box>
	)
})
export default DeleteComponent
