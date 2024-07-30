import ApiServices from "@/api/ApiServices"
import ErrorPage from "@/error"
import { UserType } from "@/types/types"
import { Box, Button, Switch, TableCell, TableRow } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import CustomAvatar from "../elements/CustomAvatar"
import SubscriptionType from "./SubscriptionType"
import Link from "next/link"
import DeleteComponent from "../DeleteComponent"

export default function StudentTableRow({
	student,
	userInfo,
	setOpen,
}: {
	student: UserType
	userInfo: UserType
	setOpen: (arg: boolean) => void
}): JSX.Element {
	const { apiRequest } = ApiServices()
	const queryClient = useQueryClient()
	const [checked, setChecked] = React.useState(true)
	const [checkedPaid, setCheckedPaid] = React.useState(true)

	// update student permit
	const { mutate, isLoading, isError } = useMutation(
		(students) => apiRequest("PATCH", students, { collectionName: "students", uid: student.uid as string }),
		{
			onSuccess: () => queryClient.invalidateQueries([`students`]),
		}
	)

	// convert seconds to date and show only day, month and year
	const studentJoinedDate = student?.createdAt?.seconds ? student.createdAt.seconds * 1000 : student?.createdAt

	const joinedDate = new Date(studentJoinedDate as string).toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	})

	const handlePermitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//@ts-ignore
		mutate({ permit: event.target.checked })
		setChecked(event.target.checked)
	}

	const handlePaidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//@ts-ignore
		mutate({ paid: event.target.checked })
		setCheckedPaid(event.target.checked)
	}

	const handleSubscriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//@ts-ignore
		mutate({ subscription_type: event.target.value })
	}

	React.useEffect(() => {
		setChecked(student?.permit)
		setCheckedPaid(student?.paid)
	}, [])

	if (isError) return <ErrorPage />

	return (
		<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, height: "50px" }}>
			<TableCell>
				<p>{joinedDate}</p>
			</TableCell>
			<TableCell component="th" scope="student">
				<Box display="flex" alignItems={"center"}>
					<CustomAvatar
						image={student?.image}
						gender={student?.gender}
						style={{ width: "35px", height: "35px", marginRight: 1.5 }}
					/>
					<p>{student?.name}</p>
				</Box>
			</TableCell>
			<TableCell>
				<p>{student?.email}</p>
			</TableCell>
			<TableCell>
				<SubscriptionType
					subscriptionType={student.subscription_type}
					handleSubscriptionChange={handleSubscriptionChange}
					isLoading={isLoading}
				/>
			</TableCell>
			<TableCell>
				<Switch checked={checked} onChange={handlePermitChange} inputProps={{ "aria-label": "controlled" }} />
			</TableCell>
			<TableCell>
				<Switch
					checked={checkedPaid}
					onChange={handlePaidChange}
					color="warning"
					inputProps={{ "aria-label": "controlled" }}
				/>
			</TableCell>
			<TableCell>
				<Link href={`/student/${student.uid}`}>
					<Button
						style={{
							background: "#5f6ac4",
							color: "white",
							boxShadow: "none",
							padding: "0px",
							textTransform: "none",
						}}
					>
						View
					</Button>
				</Link>
			</TableCell>
			{userInfo.role == "admin" && (
				<TableCell>
					<DeleteComponent
						collectionName="students"
						invalidateCache="students"
						itemId={student?.uid}
						setOpen={setOpen}
					/>
				</TableCell>
			)}
		</TableRow>
	)
}
