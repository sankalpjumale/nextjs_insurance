import PolicyClientDetail from "@/components/policy_client_detail/PolicyClientDetail"
import { getPolicyById } from "@/lib/actions/policy.actions"
import { notFound } from "next/navigation"

interface PolicyDetailPageProps {
    params: {id: string}
}

export default async function PolicyDetailPage({params}: PolicyDetailPageProps) {
    const policy = await getPolicyById(params.id)
    if(!policy) return notFound
    return <PolicyClientDetail policy={policy} />
}