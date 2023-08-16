import { LoaderFunctionArgs } from "react-router-dom"
import { getAgent, getAgentReviews } from "../api"
import Agent from "../types/Agent"
import { Review } from "../types/Review"

export type AgentLoaderReturn = {
  agent: Agent
  reviews: Review[]
}

export default async function agentLoader({
  params,
}: LoaderFunctionArgs): Promise<AgentLoaderReturn> {
  const agentId = params.agentId as string
  const [agent, reviews] = await Promise.all([
    getAgent(agentId),
    getAgentReviews(agentId),
  ])

  return { agent, reviews }
}

// {
//     "id": 216,
//     "ratings": [
//         {
//             "label": "Helpful",
//             "value": 2
//         },
//         {
//             "label": "Caring",
//             "value": 4
//         },
//         {
//             "label": "Respectful",
//             "value": 2
//         },
//         {
//             "label": "Availability",
//             "value": 3
//         }
//     ],
//     "reviewInput": "Okey-dokey",
//     "overallRating": 2.8,
//     "tags": [
//         {
//             "name": "Works around my schedule",
//             "translations": {
//                 "en": "Works around my schedule",
//                 "es": "Spanish for Works around my schedule"
//             },
//             "type": "Tag"
//         },
//         {
//             "name": "Trauma-informed",
//             "translations": {
//                 "en": "Trauma-informed",
//                 "es": "Spanish for Trauma-informed"
//             },
//             "type": "Tag"
//         },
//         {
//             "name": "Unresponsive",
//             "translations": {
//                 "en": "Unresponsive",
//                 "es": "Spanish for Unresponsive"
//             },
//             "type": "Tag"
//         }
//     ],
//     "type": "Review"
// }
