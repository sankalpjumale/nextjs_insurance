import PolicyClientDetail from "@/components/policy_client_detail/PolicyClientDetail"
import { getPolicyById } from "@/lib/actions/policy.actions"
import { notFound } from "next/navigation"

interface PolicyDetailPageProps {
    params: Promise<{id: string}>
}

export default async function PolicyDetailPage({params}: PolicyDetailPageProps) {
    const {id} = await params
    const policy = await getPolicyById(id)
    if(!policy) notFound()
    return <PolicyClientDetail policy={policy} />
}
