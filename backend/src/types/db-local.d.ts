declare module "db-local" {
  interface SchemaDefinition {
    type: any;
    required?: boolean;
  }

  interface SchemaOptions {
    [key: string]: SchemaDefinition;
  }

  class DBLocal {
    constructor(options: { path: string });
    Schema(name: string, options: SchemaOptions): any;
  }

  export default DBLocal;
}
