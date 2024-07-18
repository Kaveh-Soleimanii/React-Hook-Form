function RadioInput({ watch, register, configs, errors }) {
    const { validationSchema, option } = configs
    return (
        <div className="Radion">
            {
                option.map(({ type, name, id, value, label }) => (
                    <div key={id}>
                        <input
                            type={type}
                            name={name}
                            id={id}
                            value={value}
                            {...register(name, validationSchema)}
                            checked={watch(name) === value}
                        />
                        <label htmlFor={id}>{label}</label>

                        {errors && errors[name] && <span className="error box">{errors[name]?.message}</span>}
                    </div>
                ))
            }
        </div>
    )
}

export default RadioInput