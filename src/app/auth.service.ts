import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any = null;

  constructor(private xauth: AngularFireAuth) {
    this.xauth.onAuthStateChanged(function(user) {
      if (user) {
        alert(user.email)
        this.user = user.email;
      } else {
        alert('SIN LOGIN')
        // No user is signed in.
      }
    });
   }

  iniciarConEmailPass(email, pass){
    return this.xauth.signInWithEmailAndPassword(email, pass).then((user)=>{
      this.user=user.user.email;
      alert('Hola ' +user.user.email)
      console.log(user)
      if(!user.user.emailVerified){
        alert('Revisa tu correo y vuelve a logarte')
        this.cerrarSesion()
      }
    }).catch(()=>{
      alert('NO IDENTIFICADO')
    })
  }

  registro(email, pass){
    return this.xauth.createUserWithEmailAndPassword(email, pass).then(async user=>{
      this.user = user.user.email;
      alert('REGISTRO COMPLETADO')
      await this.mandarCorreo(email, pass)
      await this.cerrarSesion()
    }).catch(e=>{
      console.log(e)
      alert('NO SE TE PUDO CREAR')
    })
  }

  googleAuth(){
    return this.autenticarProveedor(new auth.GoogleAuthProvider())
  }

  autenticarProveedor(proveedor){
    this.xauth.signInWithPopup(proveedor).then((user)=>{
      this.user = user.user.email;
      console.log(user);
    }).catch((e)=>{
      alert('pues no estás !')
      console.log(e)
    })
  }

  cerrarSesion() {
    return this.xauth.signOut().then(() => {
      alert(this.user + ' SALIÓ DE LA SESIÓN')
      this.user = null;
    })
  }
/*
  getCurrentUsuario(){
    return this.xauth.currentUser.s;
  }
*/
  /*ponerUsuario(){
    this.getCurrentUsuario().then((u)=>{
      this.user = u.email
    })
  }*/

  mandarCorreo(email, pass){
    let user = this.xauth.currentUser.then(u=>{
      u.sendEmailVerification().then(function () {
        // Email sent.
      }).catch(function (error) {
        // An error happened.
      });
    });

 
  }







}
