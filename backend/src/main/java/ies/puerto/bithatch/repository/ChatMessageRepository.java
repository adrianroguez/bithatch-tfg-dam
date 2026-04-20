package ies.puerto.bithatch.repository;

import ies.puerto.bithatch.model.entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    /**
     * Busca los ultimos N mensajes de un usuario, ordenados de forma descendente 
     * (los mas recientes primero) para limitar la carga de contexto.
     */
    List<ChatMessage> findTop20ByUserIdOrderByCreatedAtDesc(Long userId);
}
