import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# ==========================================
# 1. CARGAR LOS DATOS
# ==========================================
# Reemplaza 'mis_datos.csv' con el nombre de tu archivo.
# Asegúrate de que el archivo CSV esté en la misma carpeta que tu script.
archivo_csv = 'mis_datos.csv'

try:
    df = pd.read_csv(archivo_csv)
    print("Datos cargados correctamente. Filas y columnas:", df.shape)
except FileNotFoundError:
    print(f"Error: No se encontró el archivo {archivo_csv}. Verifica el nombre y la ruta.")
    exit()

# NOTA SOBRE LOS DATOS:
# El código asume que tienes al menos dos columnas llamadas exactamente así:
# - 'Operador' (con el nombre o ID del operador)
# - 'Lead_Time' (con el número de horas o días que tardó)
# Si tus columnas se llaman distinto, cámbiales el nombre en el CSV o edita las líneas de abajo.

# ==========================================
# 2. CONFIGURACIÓN VISUAL
# ==========================================
# Le damos un estilo moderno a las gráficas
sns.set_theme(style="whitegrid")

# ==========================================
# 3. GRÁFICA 1: PROMEDIO DE LEAD TIME (BARRAS)
# ==========================================
plt.figure(figsize=(10, 6))

# Agrupamos y ordenamos a los operadores de menor a mayor Lead Time
orden_operadores = df.groupby('Operador')['Lead_Time'].mean().sort_values().index

# Creamos la gráfica de barras
grafico_barras = sns.barplot(
    data=df, 
    x='Operador', 
    y='Lead_Time', 
    order=orden_operadores,
    errorbar=None,  # Muestra el promedio limpio sin barras de error
    palette='viridis' # Una paleta de colores profesional
)

# Añadimos títulos y etiquetas
plt.title('Promedio de Lead Time por Operador', fontsize=16, fontweight='bold')
plt.xlabel('Operador', fontsize=12)
plt.ylabel('Lead Time (Promedio)', fontsize=12)
plt.xticks(rotation=45) # Gira los nombres 45 grados por si son largos

# Agregamos el número exacto arriba de cada barra
for p in grafico_barras.patches:
    grafico_barras.annotate(format(p.get_height(), '.1f'), 
                            (p.get_x() + p.get_width() / 2., p.get_height()), 
                            ha = 'center', va = 'center', 
                            xytext = (0, 9), 
                            textcoords = 'offset points')

plt.tight_layout()
plt.savefig('grafica_lead_time_barras.png') # Guarda la gráfica como imagen
plt.show()

# ==========================================
# 4. GRÁFICA 2: VARIABILIDAD (BOXPLOT)
# ==========================================
# El Boxplot es excelente en manufactura para ver si un operador es constante o inestable
plt.figure(figsize=(10, 6))

sns.boxplot(
    data=df, 
    x='Operador', 
    y='Lead_Time',
    order=orden_operadores, # Mantenemos el mismo orden
    palette='Set2'
)

plt.title('Variabilidad y Rango del Lead Time por Operador', fontsize=16, fontweight='bold')
plt.xlabel('Operador', fontsize=12)
plt.ylabel('Lead Time (Distribución)', fontsize=12)
plt.xticks(rotation=45)

plt.tight_layout()
plt.savefig('grafica_lead_time_boxplot.png') # Guarda la gráfica como imagen
plt.show()