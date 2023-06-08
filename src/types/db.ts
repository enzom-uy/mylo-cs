import { InferModel } from 'drizzle-orm'
import { map, nade, nadeType, user } from '../../drizzle/schema'

export type Nade = InferModel<typeof nade>
export type Map = InferModel<typeof map>
export type NadeType = InferModel<typeof nadeType>
export type User = InferModel<typeof user>
