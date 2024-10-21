import pool from "../config/db.js";

const createSale = async (saleData) => {
  const {
    sale_date,
    state,
    total,
    id_customer,
    id_distributor,
    id_seller,
    id_truck,
  } = saleData;
  const result = await pool.query(
    `INSERT INTO sales (sale_date, state, total, id_customer, id_distributor, id_seller, id_truck) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [sale_date, state, total, id_customer, id_distributor, id_seller, id_truck]
  );
  return result.rows[0];
};

const getAllSales = async () => {
  const result = await pool.query("SELECT * FROM sales");
  return result.rows;
};

const getSaleById = async (id) => {
  const result = await pool.query("SELECT * FROM sales WHERE id = $1", [id]);
  return result.rows[0];
};

const updateSale = async (id, saleData) => {
  const { state, total, id_customer, id_distributor, id_seller, id_truck } =
    saleData;
  const result = await pool.query(
    `UPDATE sales SET state = $1, total = $2, id_customer = $3, 
     id_distributor = $4, id_seller = $5, id_truck = $6 WHERE id = $7 RETURNING *`,
    [state, total, id_customer, id_distributor, id_seller, id_truck, id]
  );
  return result.rows[0];
};

const deleteSale = async (id) => {
  const result = await pool.query("DELETE FROM sales WHERE id = $1", [id]);
  return result.rowCount > 0;
};

const getSalesByRoute = async (id_route) => {
  const result = await pool.query(
    `SELECT 
      s.id AS sale_id, s.sale_date, s.state, s.total, s.id_customer, 
      s.id_distributor, s.id_seller, s.id_truck,
      c.name AS customer_name, c.surname AS customer_surname, c.phone, c.ci, 
      c.business_type, c.address, c.coord_lat, c.coord_lng, c.province, 
      c.nit, c.razon_social, u.uv,
      sd.id AS sale_detail_id, sd.id_product, sd.quantity, sd.price
    FROM sales s 
    JOIN customers c ON s.id_customer = c.id
    JOIN uvs u ON c.id_uv = u.id
    JOIN route_uvs ru ON ru.id_uv = u.id
    JOIN routes r ON r.id = ru.id_route
    JOIN sale_details sd ON sd.id_sale = s.id
    WHERE r.id = $1`,
    [id_route]
  );

  // Transformar los datos en el formato deseado
  const salesMap = new Map();

  result.rows.forEach((row) => {
    const saleId = row.sale_id;

    if (!salesMap.has(saleId)) {
      // Agregar la venta al map si no existe aún
      salesMap.set(saleId, {
        id: saleId,
        sale_date: row.sale_date,
        state: row.state,
        total: row.total,
        id_customer: row.id_customer,
        id_distributor: row.id_distributor,
        id_seller: row.id_seller,
        id_truck: row.id_truck,
        customer: {
          name: row.customer_name,
          surname: row.customer_surname,
          phone: row.phone,
          ci: row.ci,
          business_type: row.business_type,
          address: row.address,
          coord_lat: row.coord_lat,
          coord_lng: row.coord_lng,
          province: row.province,
          nit: row.nit,
          razon_social: row.razon_social,
          uv: row.uv,
        },
        sale_details: [],
      });
    }

    // Agregar los detalles de la venta
    salesMap.get(saleId).sale_details.push({
      id: row.sale_detail_id,
      id_sale: saleId,
      id_product: row.id_product,
      quantity: row.quantity,
      price: row.price,
    });
  });

  // Convertir el map a un array
  return Array.from(salesMap.values());
};

const getSalesByUser = async (id_user) => {
  const result = await pool.query(
    `SELECT 
      s.id AS sale_id, s.sale_date, s.state, s.total, s.id_customer, 
      s.id_distributor, s.id_seller, s.id_truck,
      c.name AS customer_name, c.surname AS customer_surname, c.phone, c.ci, 
      c.business_type, c.address, c.coord_lat, c.coord_lng, c.province, 
      c.nit, c.razon_social, u.uv,
      sd.id AS sale_detail_id, sd.id_product, sd.quantity, sd.price
    FROM sales s 
    JOIN customers c ON s.id_customer = c.id
    JOIN uvs u ON c.id_uv = u.id
    JOIN route_uvs ru ON ru.id_uv = u.id
    JOIN routes r ON r.id = ru.id_route
    JOIN sale_details sd ON sd.id_sale = s.id
    WHERE s.id_seller = $1 OR s.id_distributor = $1`,
    [id_user]
  );

  // Transformar los datos en el formato deseado
  const salesMap = new Map();

  result.rows.forEach((row) => {
    const saleId = row.sale_id;

    if (!salesMap.has(saleId)) {
      // Agregar la venta al map si no existe aún
      salesMap.set(saleId, {
        id: saleId,
        sale_date: row.sale_date,
        state: row.state,
        total: row.total,
        id_customer: row.id_customer,
        id_distributor: row.id_distributor,
        id_seller: row.id_seller,
        id_truck: row.id_truck,
        customer: {
          name: row.customer_name,
          surname: row.customer_surname,
          phone: row.phone,
          ci: row.ci,
          business_type: row.business_type,
          address: row.address,
          coord_lat: row.coord_lat,
          coord_lng: row.coord_lng,
          province: row.province,
          nit: row.nit,
          razon_social: row.razon_social,
          uv: row.uv,
        },
        sale_details: [],
      });
    }

    // Agregar los detalles de la venta
    salesMap.get(saleId).sale_details.push({
      id: row.sale_detail_id,
      id_sale: saleId,
      id_product: row.id_product,
      quantity: row.quantity,
      price: row.price,
    });
  });

  // Convertir el map a un array
  return Array.from(salesMap.values());
};

export default {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  getSalesByRoute,
  getSalesByUser,
};
