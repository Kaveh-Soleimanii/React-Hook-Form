function CheckBoxInput({ config, errors, register, watch }) {


  const { options, validationSchema } = config;

  return (
    <div className="formControl checkbox">
      {options.map(({ name, id, value, label }) => (
        <div key={id}>
          <input
            type="checkbox"
            id={id}
            name={name}
            value={value}
            {...register(name, validationSchema)}
            checked={watch(name).includes(value)}

          />
          <label htmlFor={id}>{label}</label>
          {errors[name] && <span className="error box">{errors[name]?.message}</span>}
        </div>
      ))}
    </div>
  );
}

export default CheckBoxInput;
