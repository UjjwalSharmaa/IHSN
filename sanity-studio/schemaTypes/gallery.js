export default {
    name: 'gallery',
    title: 'Exhibition Gallery',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Gallery Title',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        },
        {
            name: 'images',
            title: 'Gallery Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        },
        {
            name: 'showOnHome',
            title: 'Show on Home Page',
            type: 'boolean',
            initialValue: false,
        },
    ],
}