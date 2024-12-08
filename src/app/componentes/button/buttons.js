
import Link from 'next/link';
import styles from './buttons.module.css'


const Buttons = ({  
    onClick,
    title,
    type = 'button',
    variant = 'buttonNovo',
    label,
    href,
    icon,
     }) => {
 var buttonClass = styles[variant];

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {href ? (
        <Link href={href} passHref style={{textDecoration: 'none'}}>
         
            <button
              type={type}
              title={title}
              className={buttonClass}
              style={{
                cursor: 'pointer',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                display:'flex',
                alignItems:'center',
                textDecoration: 'none',
              }}
            >
              {icon && (
              <span className="material-icons" style={{ marginRight: '8px' }}>
                {icon}
              </span>
            )}

              {label}
            </button>
          
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          title={title}
          className={buttonClass}
          >
            {icon && (
            <span className="material-icons" style={{ marginRight: '8px' }}>
              {icon}
            </span>
          )}

          {label}
        </button>
      )}
    </div>
    );
};

export default Buttons;
