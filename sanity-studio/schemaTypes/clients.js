export default {
    name: 'client',
    title: 'Clientele',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        },
        {
            name: 'link',
            title: 'Website Link',
            type: 'url',
            description: 'Optional — leave empty for non-clickable logo',
        },
    ],
}