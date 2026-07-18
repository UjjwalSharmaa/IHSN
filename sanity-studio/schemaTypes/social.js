export default {
    name: 'social',
    title: 'Social Media',
    type: 'document',
    fields: [
        {
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
                list: [
                    { title: 'Facebook', value: 'Facebook' },
                    { title: 'Twitter / X', value: 'Twitter / X' },
                    { title: 'LinkedIn', value: 'LinkedIn' },
                    { title: 'Instagram', value: 'Instagram' },
                    { title: 'YouTube', value: 'YouTube' },
                    { title: 'WhatsApp', value: 'WhatsApp' },
                    { title: 'Telegram', value: 'Telegram' },
                    { title: 'Pinterest', value: 'Pinterest' },]
            },
            validation: Rule => Rule.required(),
        },
        {
            name: 'handle',
            title: 'Handle',
            type: 'string',
            description: 'e.g. @IHSNOfficial',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
        },
        {
            name: 'link',
            title: 'Profile Link',
            type: 'url',
            validation: Rule => Rule.required(),
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
        },
    ],
}