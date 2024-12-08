import Link from 'next/link';

const icone = ({ href, iconName, bgColor = '#fff', iconColor = '#212121', withBorderRadius = true, legenda='editar'}) => {
    
    
    return (
        <Link href={href ||'#' } style={{ textDecoration: 'none' }} title={legenda}>
            <span
                className="material-icons"
                style={{
                    cursor: 'pointer',
                    background: bgColor,
                    color: iconColor,
                    borderRadius: withBorderRadius ? '50%' : 'none',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
                
            >
                {iconName}
            </span>
        </Link>
    );
};

export default icone;
