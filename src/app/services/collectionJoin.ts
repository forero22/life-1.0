import { collection, CollectionReference, Firestore, query, where, collectionData } from '@angular/fire/Firestore';

import { combineLatest, pipe, of, defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AgendasDto } from '@app/models/agendas.model';
import { ClientesDto } from '@app/models/clientes.model';
import { CategoriasDto } from '@app/models/categorias.model';

export const leftJoinClases = (
  afs: Firestore,
  field,
  collection,
  limit = 100
) => {
  return source =>
    defer(() => {
      // Operator state
      let collData;

      // Track total num of joined doc reads
      let totalJoins = 0;

      return source.pipe(
        switchMap(data => {
          // Clear mapping on each emitted val ;

          // Save the parent data state
          collData = data as any[];

          const reads$ = [];
          for (const doc of collData) {
            // Push doc read to Array

            if (doc[field]) {
              // Perform query on join key, with optional limit
              const q = ref => ref.where('id', '==', doc[field]).limit(limit);

              reads$.push(collection(afs, collection, q).valueChanges()
                .pipe(
                  map(f => f[0])
                ));
            } else {
              reads$.push(of([]));
            }
          }

          return combineLatest(reads$);
        }),
        map(joins => {
          return collData.map((v, i) => {
            // totalJoins += joins[i].length;
            const value = { ...v, [collection]: joins[i] || null };
            return value;
          });
        }),
        tap(final => {
          console.log(
            `Queried ${(final as any).length}, Joined ${totalJoins} docs`
          );
          totalJoins = 0;
        })
      );
    });
};

export const leftJoinProductos = (
  afs: Firestore,
  field,
  collection1,
  limit = 100
) => {
  return source =>
    defer(() => {
      // Operator state
      let collData;

      // Track total num of joined doc reads
      let totalJoins = 0;

      return source.pipe(
        switchMap(data => {
          // Clear mapping on each emitted val ;

          // Save the parent data state
          collData = data as any[];

          const reads$ = [];
          for (const doc of collData) {
            // Push doc read to Array

            if (doc[field]) {
              // Perform query on join key, with optional limit
              const q = ref => ref.where('id', '==', doc[field]).limit(limit);

              reads$.push((collData(
                query<any>(
                  collection(afs, collection1) as CollectionReference<any>,
                  where('id', '==', doc[field])
                ), { idField: 'id' }
              ))
                .pipe(
                  leftJoinCategorias(afs, 'categoriaId', 'categorias'),
                  map(f => f[0])
                ));
            } else {
              reads$.push(of([]));
            }
          }

          return combineLatest(reads$);
        }),
        map(joins => {
          return collData.map((v, i) => {
            //totalJoins += joins[i].length;
            const value = { ...v, [collection1]: joins[i] };
            return value;
          });
        }),
        tap(final => {
          console.log(
            `Queried ${(final as any).length}, Joined ${totalJoins} docs`
          );
          totalJoins = 0;
        })
      );
    });
};

export const leftJoinClientes = (
  afs: Firestore,
  field,
  collection1,
  limit = 100
) => {
  return source =>
    defer(() => {
      // Operator state
      let collData;

      // Track total num of joined doc reads
      let totalJoins = 0;

      return source.pipe(
        switchMap(data => {
          // Clear mapping on each emitted val ;

          // Save the parent data state
          collData = data as any[];

          const reads$ = [];
          for (const doc of collData) {
            // Push doc read to Array

            if (doc[field]) {
              // Perform query on join key, with optional limit
              reads$.push((collectionData<ClientesDto>(
                query<ClientesDto>(
                  collection(afs, collection1) as CollectionReference<ClientesDto>,
                  where('id', '==', doc[field])
                ), { idField: 'id' }
              ))
                .pipe(
                  map(f => f[0])
                ));
            } else {
              reads$.push(of([]));
            }
          }

          return combineLatest(reads$);
        }),
        map(joins => {
          return collData.map((v, i) => {
            // totalJoins += joins[i].length;
            const value = { ...v, [collection1]: joins[i] || null };
            return value;
          });
        }),
        tap(final => {
          // console.log(
          //   `Queried ${(final as any).length}, Joined ${totalJoins} docs`
          // );
          totalJoins = 0;
        })
      );
    });
};

export const leftJoinCategorias = (
  afs: Firestore,
  field,
  collection1,
  limit = 100
) => {
  return source =>
    defer(() => {
      // Operator state
      let collData;

      // Track total num of joined doc reads
      let totalJoins = 0;

      return source.pipe(
        switchMap(data => {
          // Clear mapping on each emitted val ;

          // Save the parent data state
          collData = data as any[];

          const reads$ = [];
          for (const doc of collData) {
            // Push doc read to Array

            if (doc[field]) {
              // Perform query on join key, with optional limit
              reads$.push((collectionData<CategoriasDto>(
                query<CategoriasDto>(
                  collection(afs, collection1) as CollectionReference<CategoriasDto>,
                  where('id', '==', doc[field])
                ), { idField: 'id' }
              ))
                .pipe(
                  map(f => f[0])
                ));
            } else {
              reads$.push(of([]));
            }
          }

          return combineLatest(reads$);
        }),
        map(joins => {
          return collData.map((v, i) => {
            // totalJoins += joins[i].length;
            const value = { ...v, [collection1]: joins[i] || null };
            return value;
          });
        }),
        tap(final => {
          console.log(
            `Queried ${(final as any).length}, Joined ${totalJoins} docs`
          );
          totalJoins = 0;
        })
      );
    });
};
