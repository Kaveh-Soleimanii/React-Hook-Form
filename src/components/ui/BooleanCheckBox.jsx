function BooleanCheckBox({register, errors , validationSchema , name , label , watch}) {
  return (
    <div>
        <input 
        name={name}
        type="checkbox" 
        value={true}
        {...register(name , validationSchema)}
        checked={watch(name)}
        />
        <label htmlFor={name}>{label}</label>
        {errors && errors[name] && <span className="error check">{errors[name]?.message}</span>}
    </div>
  )
}

export default BooleanCheckBox