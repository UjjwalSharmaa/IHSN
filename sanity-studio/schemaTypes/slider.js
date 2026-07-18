export default {
    name: 'slider',
    title: 'Image Slider',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Just for reference in admin panel',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Lower number shows first',
        },
    ],
    orderings: [
        {
            title: 'Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
}