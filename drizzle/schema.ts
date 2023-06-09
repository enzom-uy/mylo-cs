import { sql } from 'drizzle-orm'
import {
    AnyMySqlColumn,
    datetime,
    index,
    mysqlEnum,
    mysqlSchema,
    mysqlTable,
    text,
    uniqueIndex,
    varchar
} from 'drizzle-orm/mysql-core'

export const map = mysqlTable('Map', {
    name: varchar('name', { length: 191 }).primaryKey().notNull()
})

export const nade = mysqlTable(
    'Nade',
    {
        id: varchar('id', { length: 191 }).primaryKey().notNull(),
        description: text('description'),
        mapId: varchar('map_id', { length: 191 }).notNull(),
        status: mysqlEnum('status', ['APPROVED', 'PENDING', 'DECLINED'])
            .default('PENDING')
            .notNull(),
        authorId: varchar('author_id', { length: 191 }).notNull(),
        videoUrl: varchar('video_url', { length: 191 }).notNull(),
        title: text('title').notNull(),
        nadeTypeName: varchar('nadeTypeName', { length: 191 }).notNull(),
        createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
            .default(sql`(CURRENT_TIMESTAMP(3))`)
            .notNull(),
        serverId: varchar('serverId', { length: 191 })
    },
    (table) => {
        return {
            authorIdIdx: index('Nade_author_id_idx').on(table.authorId),
            mapIdIdx: index('Nade_map_id_idx').on(table.mapId),
            nadeTypeNameIdx: index('Nade_nadeTypeName_idx').on(
                table.nadeTypeName
            ),
            serverIdIdx: index('Nade_serverId_idx').on(table.serverId),
            videoUrlKey: uniqueIndex('Nade_video_url_key').on(table.videoUrl)
        }
    }
)

export const nadeType = mysqlTable('NadeType', {
    name: varchar('name', { length: 191 }).primaryKey().notNull()
})

export const server = mysqlTable('Server', {
    id: varchar('id', { length: 191 }).primaryKey().notNull(),
    name: varchar('name', { length: 191 }).notNull()
})

export const user = mysqlTable(
    'User',
    {
        id: varchar('id', { length: 191 }).primaryKey().notNull(),
        name: varchar('name', { length: 191 }).notNull(),
        discordTag: varchar('discord_tag', { length: 191 }).notNull(),
        serverAdminId: varchar('serverAdminId', { length: 191 }),
        serverMemberId: varchar('serverMemberId', { length: 191 })
    },
    (table) => {
        return {
            discordTagKey: uniqueIndex('User_discord_tag_key').on(
                table.discordTag
            ),
            nameKey: uniqueIndex('User_name_key').on(table.name),
            serverAdminIdIdx: index('User_serverAdminId_idx').on(
                table.serverAdminId
            ),
            serverMemberIdIdx: index('User_serverMemberId_idx').on(
                table.serverMemberId
            )
        }
    }
)
