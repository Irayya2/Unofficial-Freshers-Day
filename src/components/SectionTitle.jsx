const SectionTitle = ({ eyebrow, title, description, centered = true }) => {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#B026FF]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-[#B8BDC7]">{description}</p>
    </div>
  )
}

export default SectionTitle
