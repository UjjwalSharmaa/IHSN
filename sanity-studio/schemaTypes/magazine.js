export default {
    name: 'magazine',
    title: 'E-Magazine',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'edition',
            title: 'Edition',
            type: 'string',
            description: 'e.g. December 2025',
            validation: Rule => Rule.required(),
        },
        {
            name: 'publishedDate',
            title: 'Published Date',
            type: 'date',
            validation: Rule => Rule.required(),
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        },
        {
            name: 'pdf',
            title: 'PDF File',
            type: 'file',
            options: { accept: 'application/pdf' },
            validation: Rule => Rule.required(),
        },
    ],
}