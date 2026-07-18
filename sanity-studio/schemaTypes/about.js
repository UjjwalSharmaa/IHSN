export default {
    name: 'about',
    title: 'About Us',
    type: 'document',
    fields: [
        {
            name: 'section',
            title: 'Section',
            type: 'string',
            options: {
                list: [
                    { title: 'Company Profile', value: 'company' },
                    { title: 'Founder Message', value: 'founder' },
                    { title: 'Home About Section', value: 'home' },
                ],
            },
            validation: Rule => Rule.required(),
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
        },
        {
            name: 'paragraphs',
            title: 'Paragraphs',
            type: 'array',
            of: [{ type: 'text' }],
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Leave empty to make text full width',
        },
        {
            name: 'personName',
            title: 'Person Name',
            type: 'string',
            description: 'For founder section only',
        },
        {
            name: 'designation',
            title: 'Designation',
            type: 'string',
            description: 'For founder section only',
        },
    ],
}